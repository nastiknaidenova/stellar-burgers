import { configureStore } from '@reduxjs/toolkit';
import { mockOrdersData } from '../testData/userOrders.testData';
import userOrdersReducer, {
  initialState,
  fetchUserOrders,
  selectOrdersList
} from '../slices/userOrders';

describe('Тестирование состояний и действий с пользовательскими заказами - userOrdersSlice', () => {
  describe('Селекторы', () => {
    test('Должен возвращать список заказов через селектор selectOrdersList', () => {
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
  });

  describe('Редьюсеры', () => {
    test('Должен устанавливать isLoading в true при состоянии pending', () => {
      const newState = userOrdersReducer(
        initialState,
        fetchUserOrders.pending('')
      );
      expect(newState.isLoading).toBe(true);
    });

    test('Должен обновлять заказы и устанавливать isLoading в false при состоянии fulfilled', () => {
      const newState = userOrdersReducer(
        initialState,
        fetchUserOrders.fulfilled(mockOrdersData.orders, '')
      );
      expect(newState.orders).toEqual(mockOrdersData.orders);
      expect(newState.isLoading).toBe(false);
    });

    test('Должен устанавливать isLoading в false при состоянии rejected', () => {
      const newState = userOrdersReducer(
        initialState,
        fetchUserOrders.rejected(new Error('error'), 'тестовая ошибка')
      );
      expect(newState.isLoading).toBe(false);
    });
  });
});
