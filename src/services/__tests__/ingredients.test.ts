import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, test } from '@jest/globals';
import ingredientsReducer, {
  initialState,
  fetchIngredients,
  selectIngredients,
  selectIngredientsLoadStatus,
  selectIngredientsState
} from '../slices/ingredients';
import { mockIngredientsData } from '../testData/ingredients.testData';

describe('Тестируем ingredientsSlice', () => {
  const store = configureStore({
    reducer: {
      ingredients: ingredientsReducer
    },
    preloadedState: {
      ingredients: mockIngredientsData
    }
  });

  test('Тесты селекторов', () => {
    const state = store.getState();
    expect(selectIngredientsState(state)).toEqual(mockIngredientsData);
    expect(selectIngredients(state)).toEqual(mockIngredientsData.ingredients);
    expect(selectIngredientsLoadStatus(state)).toEqual(
      mockIngredientsData.isLoading
    );
  });

  test('Тесты редьюсера: pending', () => {
    const newState = ingredientsReducer(
      initialState,
      fetchIngredients.pending('')
    );
    expect(newState.isLoading).toBe(true);
  });

  test('Тесты редьюсера: fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredientsData.ingredients
    };
    const newState = ingredientsReducer(initialState, action);
    expect(newState).toEqual(mockIngredientsData);
    expect(newState.isLoading).toBe(false);
  });

  test('Тесты редьюсера: rejected', () => {
    const newState = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(new Error('error'), 'Ошибка тестирования')
    );
    expect(newState.ingredients).toEqual([]);
    expect(newState.error).toEqual('error');
    expect(newState.isLoading).toBe(false);
  });
});
