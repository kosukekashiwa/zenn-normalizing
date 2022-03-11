import { denormalizeArticles, normalizeArticles } from './models';

describe('normalizr', () => {
  it('normalizeArticles', () => {
    const normalized = normalizeArticles([
      { id: 1, title: 'title-1', author: { id: 1, name: 'name-1' } },
      { id: 2, title: 'title-2', author: { id: 1, name: 'name-1' } },
      { id: 3, title: 'title-3', author: { id: 2, name: 'name-2' } },
    ]);

    expect(normalized.result).toEqual([1, 2, 3]);
    expect(normalized.entities).toEqual({
      articles: {
        1: { id: 1, title: 'title-1', author: 1 },
        2: { id: 2, title: 'title-2', author: 1 },
        3: { id: 3, title: 'title-3', author: 2 },
      },
      users: { 1: { id: 1, name: 'name-1' }, 2: { id: 2, name: 'name-2' } },
    });
  });

  it('denormalizeArticles', () => {
    const denormalized = denormalizeArticles({
      result: [1, 2, 3],
      entities: {
        articles: {
          1: { id: 1, title: 'title-1', author: 1 },
          2: { id: 2, title: 'title-2', author: 1 },
          3: { id: 3, title: 'title-3', author: 2 },
        },
        users: { 1: { id: 1, name: 'name-1' }, 2: { id: 2, name: 'name-2' } },
      },
    });

    expect(denormalized).toEqual([
      { id: 1, title: 'title-1', author: { id: 1, name: 'name-1' } },
      { id: 2, title: 'title-2', author: { id: 1, name: 'name-1' } },
      { id: 3, title: 'title-3', author: { id: 2, name: 'name-2' } },
    ]);
  });
});
