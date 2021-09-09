import { createAction } from '@reduxjs/toolkit';

const ActionType = {
  ADD_HISTORY: 'data/addHistory',
  ADD_RATES: 'data/addRates',
  CLEAR_HISTORY: 'data/clearHistory',
};

export const addHistory = createAction(ActionType.ADD_HISTORY, (payload) => ({
  payload,
}));

export const addRates = createAction(ActionType.ADD_RATES, (payload) => ({
  payload,
}));

export const clearHistory = createAction(ActionType.CLEAR_HISTORY);
