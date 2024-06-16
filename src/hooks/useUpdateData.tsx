import { useState } from 'react'
import axios from 'axios'

interface UseUpdateDataOptions<T> {
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
    method?: 'PUT' | 'PATCH';
}

interface UseUpdateDataResult<T> {
    data: T | null;
    loading: boolean;
    updateData: (data: Partial<T>, id?: string) => Promise<void>;
}

const useUpdateData = <T,>(
    url: string,
    { onSuccess, onError, method = 'PUT' }: UseUpdateDataOptions<T>
): UseUpdateDataResult<T> => {
    const [responseData, setResponseData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const updateData = async (data: Partial<T>, id?: string): Promise<void> => {
        setLoading(true);
        try {
            let response;
            if (method === 'PUT') {
                response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${url}`, data);
            } else {
                response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, data);
            }
            setResponseData(response.data);
            if (onSuccess) onSuccess(response.data);
        } catch (error) {
            if (onError) onError(error);
        } finally {
            setLoading(false);
        }
    };

    return { data: responseData, loading, updateData };
}

export default useUpdateData;
