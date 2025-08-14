import { useMemo } from 'react';

export function useHandleMemoError<T>(
  cb: () => T,
  deps: unknown[],
): [Error, null] | [null, T] {
  const [hasError, result] = useMemo<[false, T] | [true, Error]>(() => {
    try {
      return [false, cb()];
    } catch (error) {
      return [true, error as Error];
    }
    // TODO: avoid this hack.
    // eslint-disable-next-line react-hooks/react-compiler,react-hooks/exhaustive-deps
  }, deps);
  return hasError ? [result, null] : [null, result];
}
