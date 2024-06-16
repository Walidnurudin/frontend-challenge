/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

interface UseDataFetchingOptions {
  initialParams?: Record<string, any>;
  token?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  enable?: boolean;
}

const useDataFetching = <T,>(
  url: string,
  { initialParams = {}, token = '', onSuccess, onError, enable = true }: UseDataFetchingOptions
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (params: Record<string, any> | string = initialParams, isString: boolean = false): Promise<T[] | any> => {
    setIsLoading(true);
    try {
      const config: Record<string, any> = {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      };

      if (isString) {
        delete config.params;
      } else {
        config.params = params;
      }

      const response: AxiosResponse<T[]> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}${isString ? `?${params}` : ''}`, config);
      setData(response.data);
      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (error) {
      if (onError) onError(error);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (enable) fetchData(initialParams, false);
  }, [url, enable]);

  return { data, isLoading, refetch: (payload: Record<string, any> | string, isString: boolean) => fetchData(payload, isString) };
}

export default useDataFetching;
