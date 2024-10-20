import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer, {
  initialState,
  fetchIngredients,
  selectIngredients,
  selectIngredientsLoadStatus,
  selectIngredientsState
} from '../slices/ingredients';
import { mockIngredientsData } from '../testData/ingredients.testData';

describe('Тестирование состояний и действий с ингредиентами - ingredientsSlice', () => {
  const store = configureStore({
    reducer: {
      ingredients: ingredientsReducer
    },
    preloadedState: {
      ingredients: mockIngredientsData
    }
  });

  describe('Селекторы', () => {
    test('Должен возвращать состояние ингредиентов через селектор selectIngredientsState', () => {
      const state = store.getState();
      expect(selectIngredientsState(state)).toEqual(mockIngredientsData);
    });

    test('Должен возвращать список ингредиентов через селектор selectIngredients', () => {
      const state = store.getState();
      expect(selectIngredients(state)).toEqual(mockIngredientsData.ingredients);
    });

    test('Должен возвращать статус загрузки через селектор selectIngredientsLoadStatus', () => {
      const state = store.getState();
      expect(selectIngredientsLoadStatus(state)).toEqual(
        mockIngredientsData.isLoading
      );
    });
  });

  describe('Редьюсеры', () => {
    test('Должен устанавливать isLoading в true при состоянии pending', () => {
      const newState = ingredientsReducer(
        initialState,
        fetchIngredients.pending('')
      );
      expect(newState.isLoading).toBe(true);
    });

    test('Должен обновлять состояние с ингредиентами и устанавливать isLoading в false при состоянии fulfilled', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredientsData.ingredients
      };
      const newState = ingredientsReducer(initialState, action);
      expect(newState).toEqual(mockIngredientsData);
      expect(newState.isLoading).toBe(false);
    });

    test('Должен обнулять ингредиенты и устанавливать статус ошибки при состоянии rejected', () => {
      const newState = ingredientsReducer(
        initialState,
        fetchIngredients.rejected(new Error('error'), 'Ошибка тестирования')
      );
      expect(newState.ingredients).toEqual([]);
      expect(newState.error).toEqual('error');
      expect(newState.isLoading).toBe(false);
    });
  });
});
