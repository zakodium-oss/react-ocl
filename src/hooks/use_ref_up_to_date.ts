import { useEffect, useRef } from 'react';

/**
 * Returns a ref that is always up to date with the value passed in the argument.
 * @param value - The value to store in the ref.
 * @returns A ref that is always up to date with the value passed in the argument.
 */
export function useRefUpToDate<T>(value: T) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref;
}
