import { configureStore, combineReducers } from '@reduxjs/toolkit';
import constructorReducer from './slices/constructor';
import feedsReducer from './slices/feeds';
import ingredientsReducer from './slices/ingredients';
import newOrderReducer from './slices/newOrder';
import userOrdersReducer from './slices/userOrders';
import userReducer from './slices/user';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  constructorIngredient: constructorReducer,
  feeds: feedsReducer,
  ingredients: ingredientsReducer,
  newOrder: newOrderReducer,
  userOrders: userOrdersReducer,
  user: userReducer
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
