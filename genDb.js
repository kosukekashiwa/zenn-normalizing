const db = {
  users: [],
  articles: [],
};

for (let i = 0; i < 5; i++) {
  db.users.push({
    id: i,
    name: `userName-${i}`,
  });
}

for (let i = 0; i < 5; i++) {
  db.articles.push({
    id: i,
    title: `articleTitle-${i}`,
    author: {
      id: i,
      name: `userName-${i}`,
    },
  });
}

console.log(JSON.stringify(db));
