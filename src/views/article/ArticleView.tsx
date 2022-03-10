import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import grey from '@mui/material/colors/grey';
import { useAppSelector, useFetch } from '../../app/hooks';
import {
  articleStateIdling,
  fetchArticles,
  getArticleDataStatus,
  getArticles,
} from '../../features/article/slices';
import ArticleEditCard from './ArticleEditCard';

const ArticleView: React.VFC = () => {
  // storeからuser情報を取得
  const articleDataStatus = useAppSelector(getArticleDataStatus);
  const articles = useAppSelector(getArticles);
  useFetch(articleDataStatus, articleStateIdling, fetchArticles());

  return (
    <Paper variant="outlined" sx={{ padding: 2, background: grey[50] }}>
      <Box>Article情報を表示</Box>
      <Box>
        <Grid container spacing={2}>
          {articles.map((article) => (
            <Grid key={article.id} item xs={4}>
              <ArticleEditCard article={article} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default ArticleView;
