import { denormalize, normalize, schema } from 'normalizr';
import { NormalizedUsers, User, userNormalizrSchema, userNormalizrSchemaKey } from '../user/models';

export type Article = {
  id: number;
  title: string;
  author: User;
};

// Articleの正規化されたときの型はauthorがUserのid型となる
export type NormalizedArticle = Omit<Article, 'author'> & {
  author: User['id'];
};

export const articleNormalizrSchemaKey = 'articles';

// authorにはUserのスキーマkeyを指定
export const articleNormalizrSchema = new schema.Entity<Article>(
  articleNormalizrSchemaKey,
  { author: userNormalizrSchema },
  { idAttribute: 'id' },
);

export type NormalizedArticles = {
  [id: number]: NormalizedArticle;
};

export const normalizeArticles = (articles: Article[]) =>
  normalize<
    Article,
    { [articleNormalizrSchemaKey]: NormalizedArticles; [userNormalizrSchemaKey]: NormalizedUsers },
    Article['id'][]
  >(articles, [articleNormalizrSchema]);

export const denormalizeArticles = (articles: ReturnType<typeof normalizeArticles>): Article[] =>
  denormalize(articles.result, [articleNormalizrSchema], articles.entities);
