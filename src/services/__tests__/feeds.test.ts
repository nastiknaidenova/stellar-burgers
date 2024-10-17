import { configureStore } from '@reduxjs/toolkit';
import feedsReducer, {
  initialState,
  fetchAllFeeds,
  selectOrders,
  selectTotalFeeds,
  selectTotalTodayFeeds
} from '../slices/feeds';
import { mockFeedsData } from '../testData/feeds.testData';

describe('Тестируем feedsSlice', () => {
  test('Тесты селекторов', () => {
    const store = configureStore({
      reducer: {
        feeds: feedsReducer
      },
      preloadedState: {
        feeds: mockFeedsData
      }
    });
    const orders = selectOrders(store.getState());
    const total = selectTotalFeeds(store.getState());
    const totalToday = selectTotalTodayFeeds(store.getState());
    expect(orders).toEqual(mockFeedsData.orders);
    expect(total).toEqual(mockFeedsData.total);
    expect(totalToday).toEqual(mockFeedsData.totalToday);
  });

  test('Тесты редьюсера: pending', () => {
    const stateReceived = feedsReducer(initialState, fetchAllFeeds.pending(''));
    expect(stateReceived.isLoading).toBe(true);
  });

  test('Тесты редьюсера: fulfilled', () => {
    const action = {
      type: fetchAllFeeds.fulfilled.type,
      payload: mockFeedsData
    };
    const stateReceived = feedsReducer(initialState, action);
    expect(stateReceived).toEqual(mockFeedsData);
    expect(stateReceived.isLoading).toBe(false);
  });

  test('Тесты редьюсера: rejected', () => {
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
