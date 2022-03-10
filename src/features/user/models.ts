import { denormalize, normalize, schema } from 'normalizr';

export type User = {
  id: number;
  name: string;
};

// 正規化された状態の型
// Userは別Tableの情報を持たないので変わらないが、可読性を上げたいので定義する
export type NormalizedUser = User;

// スキーマのkeyはslices.tsでも使用するのでexportしておく
export const userNormalizrSchemaKey = 'users';

// スキーマの定義
// デフォルトでidを主キーとしてくれるが、idAttributeはid以外を主キーとしたい場合に使用する
// 今回、idを指定しているので別になくてもよい
export const userNormalizrSchema = new schema.Entity<User>(
  userNormalizrSchemaKey,
  {},
  { idAttribute: 'id' },
);

// 正規化されたUserの一覧
export type NormalizedUsers = {
  [id: number]: NormalizedUser;
};

// User情報を正規化する関数
export const normalizeUsers = (users: User[]) =>
  normalize<User, { [userNormalizrSchemaKey]: NormalizedUsers }, User['id'][]>(users, [
    userNormalizrSchema,
  ]);

// 正規化されたUser情報を元に戻す関数
export const denormalizeUsers = (users: ReturnType<typeof normalizeUsers>): User[] =>
  denormalize(users.result, [userNormalizrSchema], users.entities);
