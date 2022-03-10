import React, { useCallback } from 'react';
import { Box, Button, Card, CardContent, Stack } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { deleteArticle } from '../../features/article/slices';
import { Article } from '../../features/article/models';

export type ArticleEditCardProps = {
  article: Article;
};

const ArticleEditCard: React.VFC<ArticleEditCardProps> = (props) => {
  const dispatch = useAppDispatch();

  const handleDeleteButtonClick = useCallback(() => {
    dispatch(deleteArticle(props.article.id));
  }, [dispatch, props.article]);

  return (
    <Card>
      <CardContent>
        <Box>title: {props.article.title}</Box>
        <Box>author: {props.article.author.name}</Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleDeleteButtonClick}
            >
              Delete
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ArticleEditCard;
