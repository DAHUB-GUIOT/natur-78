import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error: any) => {
        if (error?.status === 404) return false;
        if (error?.message?.includes('aborted') || error?.message?.includes('timeout')) return false;
        return failureCount < 2; // Reduced retries
      },
      refetchOnWindowFocus: false, // Prevent conflicts
      refetchOnMount: true,
      queryFn: async ({ queryKey, signal }: { queryKey: readonly unknown[]; signal?: AbortSignal }) => {
        const url = queryKey[0] as string;
        try {
          return await apiRequest(url, { signal });
        } catch (error) {
          throw error;
        }
      },
    },
    mutations: {
      retry: false,
      onError: (error) => {
        // Silently handle mutation errors unless they're critical
        console.log('Mutation error handled:', error);
      }
    }
  },
});

// Default fetch function for API requests with improved error handling
const apiRequest = async (url: string, options: RequestInit = {}) => {
  try {
    // Set a default timeout if no signal is provided
    if (!options.signal) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 10000); // 10 second default timeout
      
      options.signal = controller.signal;
      
      // Clear timeout on response
      const originalSignal = options.signal;
      options.signal = new AbortController().signal;
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // Include cookies for authentication
        signal: originalSignal,
        ...options,
      });
      
      clearTimeout(timeoutId);

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
        const error = new Error(errorMessage) as any;
        error.status = response.status;
        throw error;
      }

      return response.json();
    } else {
      // Use provided signal
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
        const error = new Error(errorMessage) as any;
        error.status = response.status;
        throw error;
      }

      return response.json();
    }
  } catch (error) {
    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request was cancelled or timed out');
      }
      if (error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to server');
      }
    }
    throw error;
  }
};

export { queryClient, apiRequest };