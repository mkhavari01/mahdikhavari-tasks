/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import type { AxiosRequestConfig } from 'axios';

import { useMemo, useState, useEffect, useCallback } from 'react';

import axiosInstance from 'src/utils/axios';

export type UseFetchResult<T> = {
  data: T | null;
  isLoading: boolean;
  hasError: string | null;
  refetch: () => Promise<void>;
};

const useFetch = <T = unknown>(url: string, config?: AxiosRequestConfig): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<string | null>(null);

  const memoizedUrl = useMemo(() => url, [url]);
  const memoizedConfig = useMemo(() => config, [config]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setHasError(null);

    try {
      if (window) {
        const urlParams = new URLSearchParams(window?.location?.search);
        if (urlParams.get('access')) {
          axiosInstance.defaults.headers.Authorization = `Bearer ${urlParams.get('access')}`;
        }
      }

      if (url) {
        const response = await axiosInstance.get<T>(
          `${memoizedUrl}&key=${process.env.NEXT_PUBLIC_WEATHERBIT_API_KEY}`,
          {
            ...memoizedConfig,
            headers: {
              Authorization: `Bearer ${window.sessionStorage.getItem('access')}`,
            },
          }
        );
        setData(response.data);
      }
    } catch (error: any) {
      setHasError(error.message || 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }, [memoizedUrl, memoizedConfig]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return useMemo(
    () => ({
      data,
      isLoading,
      hasError,
      refetch: fetchData,
    }),
    [data, isLoading, hasError, fetchData]
  );
};

export default useFetch;
