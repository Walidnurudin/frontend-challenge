import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

interface UsePostDataOptions {
    token?: string;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    isFormData?: boolean;
}

const usePostData = <T,>(url: string, { onSuccess, onError, isFormData = false }: UsePostDataOptions) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const postData = async (dataToPost: any): Promise<T | any> => {
        setIsLoading(true);
        try {
            const headers: Record<string, string> = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` };

            headers['Content-Type'] = isFormData ? 'multipart/form-data' : 'application/json';

            const response: AxiosResponse<T> = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${url}`, dataToPost, { headers });

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

    return { data, isLoading, postData };
}

export default usePostData;
