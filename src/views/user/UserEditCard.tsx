import React, { useCallback, useState } from 'react';
import { Box, Button, Card, CardContent, Stack, TextField } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { User } from '../../features/user/models';
import { putUser } from '../../features/user/slices';

export type UserEditCardProps = {
  user: User;
};

const UserEditCard: React.VFC<UserEditCardProps> = (props) => {
  const [value, setValue] = useState('');

  const dispatch = useAppDispatch();

  const handleChange = useCallback((val: string) => {
    setValue(val);
  }, []);
  const handleEditButtonClick = useCallback(() => {
    if (value.length !== 0) {
      dispatch(putUser({ id: props.user.id, name: value }));
      setValue('');
    }
  }, [dispatch, props.user, value]);

  return (
    <Card>
      <CardContent>
        <Box>name: {props.user.name}</Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box>
            <TextField
              size="small"
              value={value}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
            />
          </Box>
          <Box>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleEditButtonClick}
            >
              Edit
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserEditCard;
