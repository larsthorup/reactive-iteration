import { useContext, useEffect, useState } from "react";
import { useRefVariable } from "./useRefVariable";

/**
 * Used in conjunction with useContextStateRef, this function subscribes to
 * state changes based on what selector returns and notifies the components
 * when changes occur.
 * @param {Context} Context React Context (i.e. React.createContext())
 * @param {Function} selector used to select parts of the context.
 */
export function useContextSelector(Context, selector) {
  // Context value should never change, ever!
  const context = useContext(Context);

  // Initialize selected state
  const [selectedState, setSelectedState] = useState(() => selector(context));

  // Selector Helpers
  const selectorRef = useRefVariable(selector);
  const prevStateRef = useRefVariable(selectedState);

  // Add listener for context state updates
  useEffect(() => {
    const cleanup = context.onStateChange(() => {
      const value = selectorRef.current(context);

      if (!Object.is(prevStateRef.current, value)) {
        setSelectedState(() => value);
      }
    });

    // Remove listener
    return () => cleanup();
  }, [context, selectorRef, prevStateRef, setSelectedState]);

  return selectedState;
}
