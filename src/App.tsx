import React from 'react';
import { AppBar, Box, Stack, Toolbar } from '@mui/material';
import { blue } from '@mui/material/colors';
import { FLEXIBLE_MAX_WIDTH, FLEXIBLE_MIN_WIDTH } from './views/theme';
import UserView from './views/user/UserView';
import ArticleView from './views/article/ArticleView';

const App: React.VFC = () => {
  return (
    <AppContainer>
      <AppHeader />
      <MainContainer>
        <Stack spacing={2}>
          <UserView />
          <ArticleView />
        </Stack>
      </MainContainer>
    </AppContainer>
  );
};

// ヘッダとコンテンツを並べるComponent
type AppContainerProps = {
  children: React.ReactNode;
};
const AppContainer: React.VFC<AppContainerProps> = (props) => {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      {props.children}
    </Box>
  );
};

// コンテンツ(User, Article情報)を表示するComponent
type MainContainerProps = {
  children: React.ReactNode;
};
const MainContainer: React.VFC<MainContainerProps> = (props) => {
  return (
    <Box flexGrow={1} sx={{ overflowY: 'auto' }}>
      <Box
        width="100vw"
        minWidth={`${FLEXIBLE_MIN_WIDTH}px`}
        maxWidth={`${FLEXIBLE_MAX_WIDTH}px`}
        margin="auto"
        px="32px"
        py="16px"
      >
        {props.children}
      </Box>
    </Box>
  );
};

// ヘッダComponent
const AppHeader: React.VFC = () => {
  return (
    <AppBar sx={{ backgroundColor: blue[900] }} position="static">
      <Toolbar
        sx={{
          width: '100vw',
          minWidth: `${FLEXIBLE_MIN_WIDTH}px`,
          maxWidth: `${FLEXIBLE_MAX_WIDTH}px`,
          margin: 'auto',
        }}
      >
        <Box sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Managing Normalized Data</Box>
      </Toolbar>
    </AppBar>
  );
};

export default App;
