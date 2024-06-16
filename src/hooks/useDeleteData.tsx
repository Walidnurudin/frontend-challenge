import axios from 'axios'
import { useState } from 'react'

interface UseDeleteDataOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

interface UseDeleteDataResult<T> {
    data: T | null;
    loading: boolean;
    deleteData: (id: string) => Promise<void>;
}

const useDeleteData = <T,>(url: string, { onSuccess, onError }: UseDeleteDataOptions): UseDeleteDataResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const deleteData = async (id: string): Promise<void> => {
        setLoading(true);
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}${url}/${id}`);
            setData(response.data);
            if (onSuccess) onSuccess(response.data);
        } catch (error) {
            if (onError) onError(error);
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, deleteData };
}

export default useDeleteData;
