import { AddListener, useListenersRef } from "./useListenersRef";
import { SetState, StateRef, useStateRef } from "./useStateRef";

export type ContextStateRef<T> = [StateRef<T>, SetState<T>, AddListener<T>];

/**
 * Hook used in conjunction with useContextSelector. It creates a state for the
 * context API that is consumed by useContextSelector (via subscribers/listeners)
 * without triggering a state update.
 * @param {*} init
 */
export function useContextStateRef<T>(init: T): ContextStateRef<T> {
  // Allow adding state-change listeners
  const { addListener, notifyListeners } = useListenersRef<T>();

  // State doesn't trigger a re-render.
  const [stateRef, setState] = useStateRef(init, (state) => {
    // Trigger listeners when state changes
    notifyListeners(state);
  });

  return [stateRef, setState, addListener];
}
