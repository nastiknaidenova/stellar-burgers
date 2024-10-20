import { configureStore } from '@reduxjs/toolkit';
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

describe('Тестирование состояний и действий с пользователем  - userSlice', () => {
  const stateConstructor = (action: { type: string; payload?: {} }) =>
    userReducer(initialState, action);

  describe('Селекторы', () => {
    test('Должен возвращать статус проверки авторизации через селектор selectIsAuthChecked', () => {
      const store = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: mockUserData
        }
      });
      const isAuthChecked = selectIsAuthChecked(store.getState());
      expect(isAuthChecked).toEqual(mockUserData.isAuthChecked);
    });

    test('Должен возвращать текущего пользователя через селектор selectCurrentUser', () => {
      const store = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: mockUserData
        }
      });
      const user = selectCurrentUser(store.getState());
      expect(user).toEqual(mockUserData.user);
    });

    test('Должен возвращать имя пользователя через селектор selectUserName', () => {
      const store = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: mockUserData
        }
      });
      const name = selectUserName(store.getState());
      expect(name).toEqual(mockUserData.user.name);
    });

    test('Должен возвращать сообщение об ошибке через селектор selectErrorMessage', () => {
      const store = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: mockUserData
        }
      });
      const error = selectErrorMessage(store.getState());
      expect(error).toEqual(mockUserData.error);
    });
  });

  describe('Регистрация пользователя', () => {
    test('Должен возвращать состояние pending при выполнении action registerUser: pending', () => {
      const newState = userReducer(
        initialState,
        registerUser.pending('', registerUserData)
      );
      expect(newState.isAuthChecked).toBe(false);
      expect(newState.error).toBe(undefined);
    });

    test('Должен обновлять состояние при успешной регистрации через action registerUser: fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: responceUser
      };
      expect(stateConstructor(action)).toEqual(mockUserData);
    });

    test('Должен обновлять состояние при ошибке регистрации через action registerUser: rejected', () => {
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
  });

  describe('Авторизация пользователя', () => {
    test('Должен возвращать состояние pending при выполнении action loginUser: pending', () => {
      const newState = userReducer(
        initialState,
        loginUser.pending('', registerUserData)
      );
      expect(newState.isAuthChecked).toBe(false);
      expect(newState.error).toBe(undefined);
    });

    test('Должен обновлять состояние при успешном входе через action loginUser: fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: responceUser
      };
      expect(stateConstructor(action)).toEqual(mockUserData);
    });

    test('Должен обновлять состояние при ошибке входа через action loginUser: rejected', () => {
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
  });

  describe('Получение пользователя', () => {
    test('Должен обновлять состояние при успешном получении через action fetchUser: fulfilled', () => {
      const action = {
        type: fetchUser.fulfilled.type,
        payload: responceUser
      };
      expect(stateConstructor(action)).toEqual(mockUserData);
    });

    test('Должен обновлять состояние при ошибке получения через action fetchUser: rejected', () => {
      const newState = userReducer(
        initialState,
        fetchUser.rejected(new Error('error'), 'тестовая ошибка')
      );
      expect(newState.error).toEqual('error');
      expect(newState.isAuthChecked).toBe(false);
    });
  });

  describe('Обновление пользователя', () => {
    test('Должен возвращать состояние pending при выполнении action updateUser: pending', () => {
      const newState = userReducer(
        initialState,
        updateUser.pending('', registerUserDataUpdated)
      );
      expect(newState.isAuthChecked).toBe(false);
      expect(newState.error).toBe(undefined);
    });

    test('Должен обновлять состояние при успешном обновлении через action updateUser: fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: responceUserUpdated
      };
      expect(stateConstructor(action)).toEqual(mockUserDataUpdated);
    });

    test('Должен обновлять состояние при ошибке обновления через action updateUser: rejected', () => {
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
  });

  describe('Выход пользователя', () => {
    test('Должен возвращать состояние при успешном выходе через action logoutUser: fulfilled', () => {
      const action = {
        type: logoutUser.fulfilled.type,
        payload: responceUser
      };
      expect(stateConstructor(action)).toEqual(initialState);
    });
  });
});
