import { useCallback } from "react";
import { useStateRef } from "./useStateRef";

/**
 * Creates a list of listeners that we can use to subscribe, unsubscribe,
 * and notify.
 */
export function useListenersRef() {
  const state = useStateRef([]);

  const [listenersRef, setListeners] = state;

  const removeListener = useCallback(
    (listener) => {
      setListeners((listeners) =>
        listeners.filter((l) => !Object.is(l, listener))
      );
    },
    [setListeners]
  );

  const addListener = useCallback(
    (listener) => {
      setListeners((listeners) => [...listeners, listener]);

      // Allow removing listeners
      return function cleanup() {
        removeListener(listener);
      };
    },
    [setListeners, removeListener]
  );

  const notifyListeners = useCallback(
    (message) => {
      listenersRef.current.forEach((listener) => listener(message));
    },
    [listenersRef]
  );

  return {
    listenersRef,
    addListener,
    removeListener,
    notifyListeners
  };
}
