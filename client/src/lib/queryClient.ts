import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error: any) => {
        if (error?.status === 404) return false;
        return failureCount < 3;
      },
      queryFn: async ({ queryKey }: { queryKey: readonly unknown[] }) => {
        const url = queryKey[0] as string;
        try {
          return await apiRequest(url);
        } catch (error) {
          throw error;
        }
      },
    },
    mutations: {
      retry: false,
      onError: (error) => {
        // Silently handle mutation errors
      }
    }
  },
});

// Default fetch function for API requests with improved error handling
const apiRequest = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies for authentication
      ...options,
    });

    if (!response.ok) {
      // Try to get error details from response
      let errorMessage = `${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch (e) {
        // If response is not JSON, use status text
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    // Handle network errors and other exceptions
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to server');
    }
    throw error;
  }
};

export { queryClient, apiRequest };