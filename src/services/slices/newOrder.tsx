import { orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export interface TNewOrderState {
  isLoading: boolean;
  orderData: TOrder | null;
  errorMessage: string | undefined;
}

const initialState: TNewOrderState = {
  isLoading: false,
  orderData: null,
  errorMessage: undefined
};

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrderState: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      });
  }
});

export const { resetOrderState } = newOrderSlice.actions;

export const selectIsLoading = (state: { newOrder: TNewOrderState }) =>
  state.newOrder.isLoading;
export const selectOrderData = (state: { newOrder: TNewOrderState }) =>
  state.newOrder.orderData;
export const selectErrorMessage = (state: { newOrder: TNewOrderState }) =>
  state.newOrder.errorMessage;

export default newOrderSlice.reducer;
