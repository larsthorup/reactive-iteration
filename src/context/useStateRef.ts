import { useCallback, useRef } from "react";
import { useRefVariable } from "./useRefVariable";

export type StateRef<T> = {current: T};
export type SetState<T> = (value: T | ((value: T) => T)) => void;

/**
 * Same as useState, but it doesn't trigger a re-render when the state changes,
 * instead it notifies the `onChange` callback.
 *
 * This is specially useful when you are only interested on parts of the state.
 * For example, when working with the Context API, to prevent re-renders of all
 * the components listening to state changes.
 *
 * @param {*} init
 * @param {Function} onChange callback executed when the state changes
 */
export function useStateRef<T>(init: T, onChange?: (value: T) => void): [StateRef<T>, SetState<T>] {
  const onChangeRef = useRefVariable(onChange);

  const stateRef = useRef(init);
  const setState = useCallback(
    (value: T | ((value: T) => T)) => {
      // Allow passing functions when needed
      if (value instanceof Function) {
        value = value(stateRef.current);
      }

      // Skip updates if it didn't change
      if (Object.is(value, stateRef.current)) {
        return;
      }

      // Update reference
      stateRef.current = value;

      // Notify of changes
      if (onChangeRef.current instanceof Function) {
        onChangeRef.current(stateRef.current);
      }
    },
    [stateRef, onChangeRef]
  );

  return [stateRef, setState];
}
