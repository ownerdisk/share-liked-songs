interface props {
    endpoint: Request["url"];
    method?: Request["method"];
    headers?: Record<string, string>;
    body?: string;
    onError?: () => void;
    onSuccess?: (data?: any) => void;
}

export const api = async ({ endpoint, method = 'GET', headers, body, onError, onSuccess }: props) => {
    const response = await fetch(endpoint, { method, headers, body });

    if (!response.ok) {
        onError?.();
        return;
    }

    try {
        const data = await response.json();
        onSuccess?.(data);
        return data;
    } catch (error) {
        onError?.();
    }
}