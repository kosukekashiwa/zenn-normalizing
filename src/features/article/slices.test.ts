import { RootState } from '../../app/store';
import {
  ArticleState,
  articleSlice,
  fetchArticles,
  fetchArticle,
  deleteArticle,
  getArticleDataStatus,
  getArticles,
  getArticle,
} from './slices';

const initialState: ArticleState = {
  status: 'idle',
  data: { ids: [], entities: {} },
};

describe('reducers', () => {
  describe('fetchArticles', () => {
    it('type is fulfilled', () => {
      const action = {
        type: fetchArticles.fulfilled.type,
        payload: {
          article: {
            ids: [1, 2, 3],
            entities: {
              1: { id: 1, title: 'title-1', author: 1 },
              2: { id: 2, title: 'title-2', author: 1 },
              3: { id: 3, title: 'title-3', author: 2 },
            },
          },
          user: { entities: {} },
        },
      };

      const state = articleSlice.reducer(initialState, action);

      expect(state.data).toEqual({
        ids: [1, 2, 3],
        entities: {
          1: { id: 1, title: 'title-1', author: 1 },
          2: { id: 2, title: 'title-2', author: 1 },
          3: { id: 3, title: 'title-3', author: 2 },
        },
      });
      expect(state.status).toEqual('success');
    });
  });

  describe('fetchArticle', () => {
    it('type is fulfilled', () => {
      const action = {
        type: fetchArticle.fulfilled.type,
        payload: {
          article: { entity: { id: 1, title: 'title-1', author: 1 } },
          user: { entity: {} },
        },
      };

      const state = articleSlice.reducer(initialState, action);

      expect(state.data).toEqual({
        ids: [1],
        entities: { 1: { id: 1, title: 'title-1', author: 1 } },
      });
      expect(state.status).toEqual('success');
    });
  });

  describe('deleteArticle', () => {
    it('type is fulfilled', () => {
      const action = {
        type: deleteArticle.fulfilled.type,
        payload: {},
      };

      const state = articleSlice.reducer(initialState, action);

      expect(state.data).toEqual({ ids: [], entities: {} });
      expect(state.status).toEqual('idle');
    });
  });
});

describe('selectors', () => {
  const testState: RootState = {
    article: {
      status: 'success',
      data: {
        ids: [1, 2],
        entities: {
          1: { id: 1, title: 'title-1', author: 1 },
          2: { id: 2, title: 'title-2', author: 1 },
        },
      },
    },
    user: { status: 'idle', data: { ids: [1], entities: { 1: { id: 1, name: 'name-1' } } } },
  };

  it('getArticleDataStatus', () => {
    const articleDataStatus = getArticleDataStatus(testState);

    expect(articleDataStatus).toEqual('success');
  });

  it('getArticles', () => {
    const articleDataStatus = getArticles(testState);

    expect(articleDataStatus).toEqual([
      { id: 1, title: 'title-1', author: { id: 1, name: 'name-1' } },
      { id: 2, title: 'title-2', author: { id: 1, name: 'name-1' } },
    ]);
  });

  it('getArticle', () => {
    const articleDataStatus = getArticle(testState, 1);

    expect(articleDataStatus).toEqual({
      id: 1,
      title: 'title-1',
      author: { id: 1, name: 'name-1' },
    });
  });
});
