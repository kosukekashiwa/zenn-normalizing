import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { client } from '../../app/apiClient';
import {
  User,
  NormalizedUsers,
  userNormalizrSchemaKey,
  normalizeUsers,
  denormalizeUsers,
} from './models';
import { fetchArticle, fetchArticles } from '../article/slices';

export type UserState = {
  // loading, error状態は実装しない
  status: 'idle' | 'success';
  // 正規化したときの型と順序を保持する配列を持つObject
  data: { ids: User['id'][]; entities: NormalizedUsers };
};

const initialState: UserState = {
  status: 'idle',
  data: { ids: [], entities: {} },
};

// apis
export const fetchUsers = createAsyncThunk('user/getEntities', async () => {
  const response = await client.get<User[]>(`/users`);
  // ここで正規化する
  // reducerで正規化してはいけない
  const normalized = normalizeUsers(response.data);
  // 空配列のとき、View側でundefinedが出るので避ける
  if (normalized.result.length !== 0) {
    return {
      user: { ids: normalized.result, entites: normalized.entities[userNormalizrSchemaKey] },
    };
  }
  return { user: { ids: [], entites: {} } };
});
export const fetchUser = createAsyncThunk('user/getEntity', async (id: number) => {
  const response = await client.get<User>(`/users/${id}`);
  return { user: { entity: response.data } };
});
export const postUser = createAsyncThunk('user/postEntity', async (name: string) => {
  await client.post(`/users`, { name });
});
export const putUser = createAsyncThunk('user/putEntity', async (user: User) => {
  await client.put(`/users/${user.id}`, { name: user.name });
});
// Userの削除はArticleとの不整合を考えないといけないので、一旦なし
// export const deleteUser = createAsyncThunk('user/deleteEntity', async (id: number) => {
//   await client.delete(`/users/${id}`);
// });

// slice(reducers & actions)
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 'idle'状態にするaction
    userStateIdling: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    // pending,rejectedは実装しない
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'success';
      // 順序を保持した配列を正規化された情報をstateに保存
      state.data.ids = action.payload.user.ids;
      state.data.entities = action.payload.user.entites;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = 'success';
      // idsに取得したUserのidがなければ追加
      if (!state.data.entities[action.payload.user.entity.id]) {
        state.data.ids.push(action.payload.user.entity.id);
      }
      // stateのentitiesを更新
      state.data.entities[action.payload.user.entity.id] = action.payload.user.entity;
    });
    builder.addCase(postUser.fulfilled, (state) => {
      state.status = 'idle';
    });
    builder.addCase(putUser.fulfilled, (state) => {
      state.status = 'idle';
    });
    // chenge state by article
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.status = 'success';
      Object.values(action.payload.user.entities).forEach((user) => {
        if (!state.data.entities[user.id]) {
          state.data.ids.push(user.id);
        }
        state.data.entities[user.id] = user;
      });
    });
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.status = 'success';
      if (!state.data.entities[action.payload.user.entity.id]) {
        state.data.ids.push(action.payload.user.entity.id);
      }
      state.data.entities[action.payload.user.entity.id] = action.payload.user.entity;
    });
  },
});

// action
export const { userStateIdling } = userSlice.actions;

// selectors
export const getUserDataStatus = ({ user }: RootState) => user.status;
export const getUsers = ({ user }: RootState) =>
  // selector内で正規化されているUser情報を元に戻す
  denormalizeUsers({
    result: user.data.ids,
    entities: { [userNormalizrSchemaKey]: user.data.entities },
  });
export const getUser = ({ user }: RootState, id: number) => user.data.entities[id];

export default userSlice.reducer;
