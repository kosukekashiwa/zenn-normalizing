import React from 'react';
import { Paper } from '@mui/material';
import grey from '@mui/material/colors/grey';

const ArticleView: React.VFC = () => {
  return (
    <Paper variant="outlined" sx={{ padding: 2, background: grey[50] }}>
      Article情報を表示
    </Paper>
  );
};

export default ArticleView;
