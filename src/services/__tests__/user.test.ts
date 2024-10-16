import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, test } from '@jest/globals';
import {
  mockUserData,
  mockUserDataUpdated,
  registerUserData,
  registerUserDataUpdated,
  responceUser,
  responceUserUpdated
} from '../testData/user.testData';
import userReducer, {
  initialState,
  selectIsAuthChecked,
  selectCurrentUser,
  selectUserName,
  selectErrorMessage,
  fetchUser,
  registerUser,
  loginUser,
  updateUser,
  logoutUser
} from '../slices/user';

describe('Тестируем userSlice', () => {
  const stateConstructor = (action: { type: string; payload?: {} }) =>
    userReducer(initialState, action);

  test('Тесты селекторов', () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      },
      preloadedState: {
        user: mockUserData
      }
    });
    const isAuthChecked = selectIsAuthChecked(store.getState());
    const user = selectCurrentUser(store.getState());
    const name = selectUserName(store.getState());
    const error = selectErrorMessage(store.getState());
    expect(isAuthChecked).toEqual(mockUserData.isAuthChecked);
    expect(user).toEqual(mockUserData.user);
    expect(name).toEqual(mockUserData.user.name);
    expect(error).toEqual(mockUserData.error);
  });

  test('Тесты редьюсера register: pending', () => {
    const newState = userReducer(
      initialState,
      registerUser.pending('', registerUserData)
    );
    expect(newState.isAuthChecked).toBe(false);
    expect(newState.error).toBe(undefined);
  });

  test('Тесты редьюсера register: fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: responceUser
    };
    expect(stateConstructor(action)).toEqual(mockUserData);
  });

  test('Тесты редьюсера register: rejected', () => {
    const newState = userReducer(
      initialState,
      registerUser.rejected(
        new Error('error'),
        'тестовая ошибка',
        registerUserData
      )
    );
    expect(newState.error).toEqual('error');
  });

  test('Тесты редьюсера loginUser: pending', () => {
    const newState = userReducer(
      initialState,
      loginUser.pending('', registerUserData)
    );
    expect(newState.isAuthChecked).toBe(false);
    expect(newState.error).toBe(undefined);
  });

  test('Тесты редьюсера loginUser: fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: responceUser
    };
    expect(stateConstructor(action)).toEqual(mockUserData);
  });

  test('Тесты редьюсера loginUser: rejected', () => {
    const newState = userReducer(
      initialState,
      loginUser.rejected(
        new Error('error'),
        'тестовая ошибка',
        registerUserData
      )
    );
    expect(newState.error).toEqual('error');
    expect(newState.isAuthChecked).toBe(false);
  });

  test('Тесты редьюсера fetchUser: fulfilled', () => {
    const action = {
      type: fetchUser.fulfilled.type,
      payload: responceUser
    };
    expect(stateConstructor(action)).toEqual(mockUserData);
  });

  test('Тесты редьюсера fetchUser: rejected', () => {
    const newState = userReducer(
      initialState,
      fetchUser.rejected(new Error('error'), 'тестовая ошибка')
    );
    expect(newState.error).toEqual('error');
    expect(newState.isAuthChecked).toBe(false);
  });

  test('Тесты редьюсера updateUser: pending', () => {
    const newState = userReducer(
      initialState,
      updateUser.pending('', registerUserDataUpdated)
    );
    expect(newState.isAuthChecked).toBe(false);
    expect(newState.error).toBe(undefined);
  });

  test('Тесты редьюсера updateUser: fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: responceUserUpdated
    };
    expect(stateConstructor(action)).toEqual(mockUserDataUpdated);
  });

  test('Тесты редьюсера updateUser: rejected', () => {
    const newState = userReducer(
      initialState,
      updateUser.rejected(
        new Error('error'),
        'тестовая ошибка',
        registerUserDataUpdated
      )
    );
    expect(newState.error).toEqual('error');
    expect(newState.isAuthChecked).toBe(false);
  });

  test('Тесты редьюсера logoutUser: fulfilled', () => {
    const action = {
      type: logoutUser.fulfilled.type,
      payload: responceUser
    };
    expect(stateConstructor(action)).toEqual(initialState);
  });
});
