import { useEffect } from 'react';
import { ActionCreatorWithoutPayload, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFetch = (
  dataStatus: 'idle' | 'success',
  stateIdlingAction: ActionCreatorWithoutPayload<string>,
  // eslint-disable-next-line
  fetchAction: ThunkAction<any, any, any, any>,
): void => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // 初回表示時にidle状態にするactionをdispatch
    dispatch(stateIdlingAction);
  }, []);
  useEffect(() => {
    // idle状態ならfetch
    if (dataStatus === 'idle') {
      dispatch(fetchAction);
    }
  }, [dataStatus, dispatch, fetchAction]);
};
