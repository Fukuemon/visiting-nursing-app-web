import { useMemo } from 'react';

import { debounce } from 'es-toolkit';
import { useDeepCompareEffect } from 'react-use';

export const useDebounce = <T extends Record<string, unknown>>(
  callback: (value: T) => void,
  { value, debounceMs }: { value: T; debounceMs: number },
) => {
  const debounceValue = useMemo(
    () =>
      debounce((value) => {
        callback(value);
      }, debounceMs),
    [],
  );

  useDeepCompareEffect(() => {
    debounceValue(value);
  }, [value]);
};
