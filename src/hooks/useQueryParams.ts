'use client';

import { useCallback } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';

function useQueryParams<T>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setQueryParams = useCallback(
    (params: Partial<T>) => {
      const urlSearchParams = new URLSearchParams(searchParams?.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          urlSearchParams.delete(key);
        } else {
          urlSearchParams.set(key, String(value));
        }
      });

      const search = Object.fromEntries(urlSearchParams.entries());

      const query = queryString.stringify(search, {
        arrayFormat: 'comma',
      });

      router.replace(`${pathname}?${query}`, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  return { queryParams: searchParams, setQueryParams };
}

export { useQueryParams };
