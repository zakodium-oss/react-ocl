import { useMemo } from 'react';

export function useHandleMemoError(cb, deps) {
  const [hasError, result] = useMemo(() => {
    try {
      return [false, cb()];
    } catch (error) {
      return [true, error];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return hasError ? [result, null] : [null, result];
}
