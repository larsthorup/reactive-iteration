import { useRef } from "react";

// see: https://medium.com/@pgarciacamou/how-to-avoid-running-effects-on-every-render-in-react-userefvariable-hook-ad6e4a5e0abb
export function useRefVariable(value) {
  const ref = useRef();
  ref.current = value;
  return ref;
}
