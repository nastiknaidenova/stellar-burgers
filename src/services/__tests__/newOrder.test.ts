import { configureStore } from '@reduxjs/toolkit';
import {
  mockOrderData,
  mockOrderReceivedData
} from '../testData/newOrder.testData';
import newOrderReducer, {
  initialState,
  selectOrderData,
  selectIsLoading,
  createOrder,
  resetOrderState
} from '../slices/newOrder';

describe('Тестирование состояний и действий с заказом - newOrderSlice', () => {
  describe('Селекторы', () => {
    test('Должен возвращать статус загрузки заказа через селектор selectIsLoading', () => {
      const store = configureStore({
        reducer: {
          newOrder: newOrderReducer
        },
        preloadedState: {
          newOrder: mockOrderData
        }
      });
      const orderRequest = selectIsLoading(store.getState());
      expect(orderRequest).toEqual(mockOrderData.isLoading);
    });

    test('Должен возвращать данные заказа через селектор selectOrderData', () => {
      const store = configureStore({
        reducer: {
          newOrder: newOrderReducer
        },
        preloadedState: {
          newOrder: mockOrderData
        }
      });
      const modal = selectOrderData(store.getState());
      expect(modal).toEqual(mockOrderData.orderData);
    });
  });

  describe('Сброс состояния заказа', () => {
    test('Должен сбрасывать состояние заказа через action resetOrderState', () => {
      const state = {
        isLoading: true,
        orderData: mockOrderReceivedData.order,
        errorMessage: 'undefined'
      };
      const stateReceived = newOrderReducer(state, resetOrderState());
      expect(stateReceived).toEqual(initialState);
    });
  });

  describe('Создание нового заказа', () => {
    test('Должен устанавливать статус загрузки в true при создании заказа: pending', () => {
      const newState = newOrderReducer(
        initialState,
        createOrder.pending('', [])
      );
      expect(newState.isLoading).toBe(true);
    });

    test('Должен обновлять данные заказа и статус загрузки после успешного создания заказа: fulfilled', () => {
      const newState = newOrderReducer(
        initialState,
        createOrder.fulfilled(mockOrderReceivedData, '', [''])
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.orderData).toEqual(mockOrderReceivedData.order);
    });

    test('Должен устанавливать сообщение об ошибке при неудачном создании заказа: rejected', () => {
      const newState = newOrderReducer(
        initialState,
        createOrder.rejected(new Error('error'), 'тестовая ошибка', [''])
      );
      expect(newState.errorMessage).toEqual('error');
    });
  });
});
