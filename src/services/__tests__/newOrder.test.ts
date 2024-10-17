import { configureStore } from '@reduxjs/toolkit';
import {
  mockOrderData,
  mockOrderReceivedData
} from '../testData/newOrder.testData';
import newOrderReduser, {
  initialState,
  selectOrderData,
  selectIsLoading,
  createOrder,
  resetOrderState
} from '../slices/newOrder';

describe('Тестируем newOrderSlice', () => {
  test('Тесты селекторов', () => {
    const store = configureStore({
      reducer: {
        newOrder: newOrderReduser
      },
      preloadedState: {
        newOrder: mockOrderData
      }
    });
    const orderRequest = selectIsLoading(store.getState());
    const modal = selectOrderData(store.getState());

    expect(orderRequest).toEqual(mockOrderData.isLoading);
    expect(modal).toEqual(mockOrderData.orderData);
  });

  test('Тесты редьюсера resetOrder', () => {
    const state = {
      isLoading: true,
      orderData: mockOrderReceivedData.order,
      errorMessage: 'undefined'
    };
    const stateReceived = newOrderReduser(state, resetOrderState());
    expect(stateReceived).toEqual(initialState);
  });

  test('Тесты редьюсера placeNewOrder: pending', () => {
    const newState = newOrderReduser(initialState, createOrder.pending('', []));
    expect(newState.isLoading).toBe(true);
  });

  test('Тесты редьюсера placeNewOrder: fulfilled', () => {
    const newState = newOrderReduser(
      initialState,
      createOrder.fulfilled(mockOrderReceivedData, '', [''])
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.orderData).toEqual(mockOrderReceivedData.order);
  });

  test('Тесты редьюсера placeNewOrder: rejected', () => {
    const newState = newOrderReduser(
      initialState,
      createOrder.rejected(new Error('error'), 'тестовая ошибка', [''])
    );
    expect(newState.errorMessage).toEqual('error');
  });
});
