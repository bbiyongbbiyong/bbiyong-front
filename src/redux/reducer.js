import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { citySliceReducer } from './citySlice';
import { memberReducer } from './memberReducer';

const rootReducer = combineReducers({
  member: memberReducer,
  city: citySliceReducer,
});

const Store = configureStore({
  reducer: rootReducer,
});

export { Store, rootReducer };
