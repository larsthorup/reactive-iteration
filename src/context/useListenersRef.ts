import { useCallback } from "react";
import { useStateRef } from "./useStateRef";

export type Listener<T> = (message: T) => void;
export type AddListener<T> = (listener: Listener<T>) => () => void;

/**
 * Creates a list of listeners that we can use to subscribe, unsubscribe,
 * and notify.
 */
export function useListenersRef<T>() {
  const state = useStateRef<Listener<T>[]>([]);

  const [listenersRef, setListeners] = state;

  const removeListener = useCallback(
    (listener: Listener<T>) => {
      setListeners((listeners: Listener<T>[]) =>
        listeners.filter((l) => !Object.is(l, listener))
      );
    },
    [setListeners]
  );

  const addListener = useCallback(
    (listener: Listener<T>) => {
      setListeners((listeners) => [...listeners, listener]);

      // Allow removing listeners
      return function cleanup() {
        removeListener(listener);
      };
    },
    [setListeners, removeListener]
  );

  const notifyListeners = useCallback(
    (message: T) => {
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
