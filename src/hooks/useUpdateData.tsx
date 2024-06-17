import { useState } from 'react'
import axios from 'axios'

interface UseUpdateDataOptions<T> {
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
    method?: 'PUT' | 'PATCH';
}

interface UseUpdateDataResult<T> {
    data: T | null;
    isLoading: boolean;
    updateData: (data: Partial<T>, id?: string) => Promise<void>;
}

const useUpdateData = <T,>(
    url: string,
    { onSuccess, onError, method = 'PUT' }: UseUpdateDataOptions<T>
): UseUpdateDataResult<T> => {
    const [responseData, setResponseData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateData = async (data: Partial<T>, id?: string): Promise<void> => {
        setIsLoading(true);
        try {
            let response;
            const headers: Record<string, string> = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` };

            if (method === 'PUT') {
                response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${url}`, data, { headers });
            } else {
                response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, data, { headers });
            }
            setResponseData(response.data);
            if (onSuccess) onSuccess(response.data);
        } catch (error) {
            if (onError) onError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data: responseData, isLoading, updateData };
}

export default useUpdateData;
