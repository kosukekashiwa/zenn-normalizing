import React from 'react';
import { Box, Grid, Paper, Stack } from '@mui/material';
import grey from '@mui/material/colors/grey';
import { useAppSelector, useFetch } from '../../app/hooks';
import {
  fetchUsers,
  getUserDataStatus,
  getUsers,
  userStateIdling,
} from '../../features/user/slices';
import UserAddForm from './UserAddForm';
import UserEditCard from './UserEditCard';

const UserView: React.VFC = () => {
  // user stateのstatusを取得
  const userDataStatus = useAppSelector(getUserDataStatus);
  // storeのuser情報を取得
  const users = useAppSelector(getUsers);
  // useFetchで初回取得 & userDataStatusが変わる度に取得
  useFetch(userDataStatus, userStateIdling, fetchUsers());

  return (
    <Paper variant="outlined" sx={{ padding: 2, background: grey[50] }}>
      <Stack spacing={2}>
        <Box sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>User List</Box>
        <UserAddForm />
        <Box>
          <Grid container spacing={2}>
            {users.map((user) => (
              <Grid key={user.id} item xs={4}>
                <UserEditCard user={user} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Paper>
  );
};

export default UserView;
