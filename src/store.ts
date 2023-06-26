import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { products } from "./products";

export type Product = {
  id: string;
  name: string;
  quantity: number;
};

interface StockState { [key: string]: Product };

const largeState: StockState = Object.fromEntries(products.map((name, i) => {
  const id = i.toString();
  return [id, { id: i.toString(), name, quantity: 0 }];
}));


const stockSlice = createSlice({
  name: 'stock',
  initialState: largeState,
  reducers: {
    increment: (
      state,
      { payload: { id } }: PayloadAction<{ id: string }>,
    ) => {
      const product = state[id];
      if (product) {
        ++product.quantity;
      }
    },
  },
});

export const store = configureStore({
  reducer: {
    stock: stockSlice.reducer,
  },
});
export const { increment } = stockSlice.actions;

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
