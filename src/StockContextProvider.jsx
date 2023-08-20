import { createContext, useCallback, useMemo } from "react";
import { useContextSelector } from "./context/useContextSelector";
import { useContextStateRef } from "./context/useContextStateRef";
import { products } from "./products";

const StockContext = createContext();

export const useStockContextSelector = (selector) =>
  useContextSelector(StockContext, selector);

const initialStock = Object.fromEntries(
  products.map((name, i) => {
    const id = i.toString();
    return [id, { id: i.toString(), name, quantity: 0 }];
  })
);

export function StockContextProvider({ children }) {
  const [stateRef, setState, onStateChange] = useContextStateRef(initialStock);

  const increment = useCallback(
    ({id}) =>
      setState((stock) => {
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
