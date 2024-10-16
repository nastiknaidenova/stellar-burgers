import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, test } from '@jest/globals';
import { mockOrdersData } from '../testData/userOrders.testData';
import userOrdersReducer, {
  initialState,
  fetchUserOrders,
  selectOrdersList
} from '../slices/userOrders';

describe('Тестируем userOrdersSlice', () => {
  test('Тесты селектора', () => {
    const store = configureStore({
      reducer: {
        userOrders: userOrdersReducer
      },
      preloadedState: {
        userOrders: mockOrdersData
      }
    });
    const orderRequest = selectOrdersList(store.getState());

    expect(orderRequest).toEqual(mockOrdersData.orders);
  });

  test('Тесты редьюсера: pending', () => {
    const newState = userOrdersReducer(
      initialState,
      fetchUserOrders.pending('')
    );
    expect(newState.isLoading).toBe(true);
  });

  test('Тесты редьюсера: fulfilled', () => {
    const newState = userOrdersReducer(
      initialState,
      fetchUserOrders.fulfilled(mockOrdersData.orders, '')
    );
    expect(newState.orders).toEqual(mockOrdersData.orders);
    expect(newState.isLoading).toBe(false);
  });

  test('Тесты редьюсера: rejected', () => {
    const newState = userOrdersReducer(
      initialState,
      fetchUserOrders.rejected(new Error('error'), 'тестовая ошибка')
    );
    expect(newState.isLoading).toBe(false);
  });
});
