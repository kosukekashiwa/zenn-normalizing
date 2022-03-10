import React, { useCallback, useState } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { postUser } from '../../features/user/slices';

const UserAddForm: React.VFC = () => {
  const [value, setValue] = useState('');

  const dispatch = useAppDispatch();

  const handleChange = useCallback((val: string) => {
    setValue(val);
  }, []);
  const handleAddButtonClick = useCallback(() => {
    if (value.length !== 0) {
      dispatch(postUser(value));
      setValue('');
    }
  }, [dispatch, value]);

  return (
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
        <Button size="small" variant="contained" onClick={handleAddButtonClick}>
          Add
        </Button>
      </Box>
    </Stack>
  );
};

export default UserAddForm;
