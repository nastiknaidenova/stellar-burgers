import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { constructorSlice } from './slices/constructor';
import feedsReducer from './slices/feeds';
import ingredientsReducer from './slices/ingredients';
import newOrderReducer from './slices/newOrder';
import userOrdersReducer from './slices/userOrders';
import userReduser from './slices/user';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  [constructorSlice.name]: constructorSlice.reducer,
  feeds: feedsReducer,
  ingredients: ingredientsReducer,
  newOrder: newOrderReducer,
  userOrders: userOrdersReducer,
  user: userReduser
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
