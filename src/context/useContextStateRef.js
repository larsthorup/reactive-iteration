import { useListenersRef } from "./useListenersRef";
import { useStateRef } from "./useStateRef";

/**
 * Hook used in conjunction with useContextSelector. It creates a state for the
 * context API that is consumed by useContextSelector (via subscribers/listeners)
 * without triggering a state update.
 * @param {*} init
 */
export function useContextStateRef(init) {
  // Allow adding state-change listeners
  const { addListener, notifyListeners } = useListenersRef();

  // State doesn't trigger a re-render.
  const [stateRef, setState] = useStateRef(init, (state) => {
    // Trigger listeners when state changes
    notifyListeners(state);
  });

  return [stateRef, setState, addListener];
}
