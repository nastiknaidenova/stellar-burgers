import { configureStore } from '@reduxjs/toolkit';
import feedsReducer, {
  initialState,
  fetchAllFeeds,
  selectOrders,
  selectTotalFeeds,
  selectTotalTodayFeeds
} from '../slices/feeds';
import { mockFeedsData } from '../testData/feeds.testData';

describe('Тестирование состояний и действий с данными о заказах - feedsSlice', () => {
  describe('Селекторы', () => {
    test('Должен возвращать заказы через селектор selectOrders', () => {
      const store = configureStore({
        reducer: {
          feeds: feedsReducer
        },
        preloadedState: {
          feeds: mockFeedsData
        }
      });
      const orders = selectOrders(store.getState());
      expect(orders).toEqual(mockFeedsData.orders);
    });

    test('Должен возвращать общее количество бургеров через селектор selectTotalFeeds', () => {
      const store = configureStore({
        reducer: {
          feeds: feedsReducer
        },
        preloadedState: {
          feeds: mockFeedsData
        }
      });
      const total = selectTotalFeeds(store.getState());
      expect(total).toEqual(mockFeedsData.total);
    });

    test('Должен возвращать общее количество бургеров за сегодня через селектор selectTotalTodayFeeds', () => {
      const store = configureStore({
        reducer: {
          feeds: feedsReducer
        },
        preloadedState: {
          feeds: mockFeedsData
        }
      });
      const totalToday = selectTotalTodayFeeds(store.getState());
      expect(totalToday).toEqual(mockFeedsData.totalToday);
    });
  });

  describe('Редьюсер', () => {
    test('Должен устанавливать состояние загрузки в true через action fetchAllFeeds.pending', () => {
      const stateReceived = feedsReducer(
        initialState,
        fetchAllFeeds.pending('')
      );
      expect(stateReceived.isLoading).toBe(true);
    });

    test('Должен обновлять состояние с полученными данными через action fetchAllFeeds.fulfilled', () => {
      const action = {
        type: fetchAllFeeds.fulfilled.type,
        payload: mockFeedsData
      };
      const stateReceived = feedsReducer(initialState, action);
      expect(stateReceived).toEqual(mockFeedsData);
      expect(stateReceived.isLoading).toBe(false);
    });

    test('Должен сбрасывать состояние и устанавливать ошибку через action fetchAllFeeds.rejected', () => {
      const stateReceived = feedsReducer(
        initialState,
        fetchAllFeeds.rejected(new Error('error'), 'Ошибка тестирования')
      );
      expect(stateReceived.orders).toEqual([]);
      expect(stateReceived.total).toEqual(0);
      expect(stateReceived.totalToday).toEqual(0);
      expect(stateReceived.error).toEqual('error');
      expect(stateReceived.isLoading).toBe(false);
    });
  });
});
