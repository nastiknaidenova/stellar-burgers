import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store';

describe('Тестирование инициализации корневого редьюсера - rootReducer', () => {
  test('Должно возвращаться начальное состояние rootReducer', () => {
    const store = configureStore({ reducer: rootReducer });
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(store.getState()).toEqual(initialState);
  });
});
