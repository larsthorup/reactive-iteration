import { configureStore, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch, shallowEqual } from "react-redux";
import { products } from "./products";

export type Product = {
  id: string;
  name: string;
  quantity: number;
};

export interface Stock { [key: string]: Product };

const productSubset = import.meta.env['NODE_ENV'] === "test" ? products.slice(0, 10) : products;
const state: Stock = Object.fromEntries(productSubset.map((name, i) => {
  const id = i.toString();
  return [id, { id: i.toString(), name, quantity: 0 }];
}));


const stockSlice = createSlice({
  name: 'stock',
  initialState: state,
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
export type RootState = ReturnType<typeof store.getState>;
export const { increment } = stockSlice.actions;

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export const selectStockIds = createSelector(
  (state: RootState) => state.stock,
  (stock) => Object.keys(stock),
  {
    memoizeOptions: {
      // Note: return previous result if the new result is equal to previous result
      resultEqualityCheck: shallowEqual,
    },    
  }
)

export const selectStocks = createSelector(
  (state: RootState) => state.stock,
  (stock) => Object.values(stock),
);

