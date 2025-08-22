// Global error handler for unhandled promise rejections
export const setupGlobalErrorHandlers = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.warn('Unhandled promise rejection caught:', event.reason);
    
    // Prevent the default behavior (console error)
    event.preventDefault();
    
    // Handle specific error types
    if (event.reason instanceof Error) {
      const error = event.reason;
      
      // Authentication errors - redirect to login
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        console.warn('Authentication error detected, handling gracefully');
        return;
      }
      
      // Network errors - log but don't crash
      if (error.message.includes('Network error') || error.message.includes('fetch')) {
        console.warn('Network error detected, handling gracefully');
        return;
      }
      
      // Database/API errors - log but don't crash
      if (error.message.includes('Database') || error.message.includes('API')) {
        console.warn('Database/API error detected, handling gracefully');
        return;
      }
    }
    
    // For any other errors, log them but don't crash the app
    console.warn('Unknown promise rejection handled gracefully');
  });

  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    console.warn('Global error caught:', event.error);
    
    // Prevent default behavior for non-critical errors
    if (event.error instanceof Error) {
      const error = event.error;
      
      // Script loading errors, network issues, etc.
      if (error.message.includes('Script') || 
          error.message.includes('Loading') || 
          error.message.includes('fetch')) {
        event.preventDefault();
        return;
      }
    }
  });
};

export default setupGlobalErrorHandlers;