import { createContext, useCallback, useMemo } from "react";
import {
  ContextState,
  ContextSelector,
  useContextSelector,
} from "./context/useContextSelector";
import { useContextStateRef } from "./context/useContextStateRef";
import { products } from "./products";
import { Stock } from "./store";

type StockContextState = ContextState<Stock> & {
  increment: ({ id }: { id: string }) => void;
};

const StockContext = createContext<StockContextState>(
  undefined as unknown as StockContextState
);

export type StockContextSelector<U> = ContextSelector<Stock, StockContextState, U>;

export function useStockContextSelector<U>(selector: StockContextSelector<U>) {
  return useContextSelector(StockContext, selector);
}

const initialStock = Object.fromEntries(
  products.map((name, i) => {
    const id = i.toString();
    return [id, { id: i.toString(), name, quantity: 0 }];
  })
);

export function StockContextProvider({ children }: React.PropsWithChildren) {
  const [stateRef, setState, onStateChange] = useContextStateRef(initialStock);

  const increment = useCallback(
    ({ id }: { id: string }) =>
      setState((stock: Stock) => {
        return {
          ...stock,
          [id]: {
            ...stock[id],
            quantity: stock[id].quantity + 1,
          },
        };
      }),
    [setState]
  );

  // Value never changes
  const value = useMemo(
    () => ({ stateRef, onStateChange, increment }),
    [stateRef, onStateChange, increment]
  );

  return (
    <StockContext.Provider value={value}>{children}</StockContext.Provider>
  );
}
