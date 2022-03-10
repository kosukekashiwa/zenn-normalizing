import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { client } from '../../app/apiClient';
import { userNormalizrSchemaKey } from '../user/models';
import {
  Article,
  NormalizedArticles,
  normalizeArticles,
  articleNormalizrSchemaKey,
  denormalizeArticles,
} from './models';

export type ArticleState = {
  status: 'idle' | 'success';
  data: { ids: Article['id'][]; entities: NormalizedArticles };
};

const initialState: ArticleState = {
  status: 'idle',
  data: { ids: [], entities: {} },
};

// apis
export const fetchArticles = createAsyncThunk('article/getEntities', async () => {
  const response = await client.get<Article[]>(`/articles`);
  const normalized = normalizeArticles(response.data);
  if (normalized.result.length !== 0) {
    return {
      article: { ids: normalized.result, entities: normalized.entities[articleNormalizrSchemaKey] },
      user: { entities: normalized.entities[userNormalizrSchemaKey] },
    };
  }
  return {
    article: { ids: [], entities: {} },
    user: { entities: {} },
  };
});
export const fetchArticle = createAsyncThunk('article/getEntity', async (id: number) => {
  const response = await client.get<Article>(`/articles/${id}`);
  // Articleは単体取得でもUser情報があるため正規化する必要がある
  const normalized = normalizeArticles([response.data]);
  return {
    // eslint-disable-next-line
    article: { entity: Object.values(normalized.entities[articleNormalizrSchemaKey]).pop()! },
    // eslint-disable-next-line
    user: { entity: Object.values(normalized.entities[userNormalizrSchemaKey]).pop()! },
  };
});
// post, putはUserとの不整合考えないといけないので、一旦なし
export const deleteArticle = createAsyncThunk('article/deleteEntity', async (id: number) => {
  await client.delete(`/articles/${id}`);
});

// slice(action & reducer)
export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    articleStateIdling: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.status = 'success';
      state.data.ids = action.payload.article.ids;
      state.data.entities = action.payload.article.entities;
    });
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.status = 'success';
      if (!state.data.entities[action.payload.article.entity.id]) {
        state.data.ids.push(action.payload.article.entity.id);
      }
      state.data.entities[action.payload.article.entity.id] = action.payload.article.entity;
    });
    builder.addCase(deleteArticle.fulfilled, (state) => {
      state.status = 'idle';
    });
  },
});

// action
export const { articleStateIdling } = articleSlice.actions;

// selectors
export const getArticleDataStatus = ({ article }: RootState) => article.status;
export const getArticles = ({ article, user }: RootState) =>
  denormalizeArticles({
    result: article.data.ids,
    entities: {
      [articleNormalizrSchemaKey]: article.data.entities,
      [userNormalizrSchemaKey]: user.data.entities,
    },
  });
export const getArticle = ({ article, user }: RootState, id: number) =>
  // User情報が必要なのでMapから直接取得できない->denormalize
  denormalizeArticles({
    result: [id],
    entities: {
      [articleNormalizrSchemaKey]: article.data.entities,
      [userNormalizrSchemaKey]: user.data.entities,
    },
  }).pop();

export default articleSlice.reducer;
