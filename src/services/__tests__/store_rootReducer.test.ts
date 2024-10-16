import { expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store';

describe('Тестируем инициализацию rootReducer', () => {
  test('Тесты начального состояния rootReducer', () => {
    const store = configureStore({ reducer: rootReducer });
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(store.getState()).toEqual(initialState);
  });
});
