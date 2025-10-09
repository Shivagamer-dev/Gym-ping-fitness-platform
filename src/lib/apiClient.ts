const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

interface ApiResponse {
    data?: any;
    error?: { message: string };
}

async function post(endpoint: string, data: any): Promise<ApiResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: { message: errorData.message || `HTTP error! status: ${response.status}` } };
        }

        const responseData = await response.json();
        return { data: responseData };
    } catch (error: any) {
        return { error: { message: error.message || 'An unknown error occurred' } };
    }
}

export const apiClient = {
    post,
};
