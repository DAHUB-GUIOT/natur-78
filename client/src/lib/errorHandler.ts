// Global error handler for unhandled promise rejections
export const setupGlobalErrorHandlers = () => {
  // Handle unhandled promise rejections silently
  window.addEventListener('unhandledrejection', (event) => {
    // Prevent the default behavior (console error)
    event.preventDefault();
    
    // Handle all promise rejections silently - no logging needed
    // This prevents console spam while maintaining application stability
    return;
  });

  // Handle uncaught errors silently
  window.addEventListener('error', (event) => {
    // Prevent default behavior for all non-critical errors
    event.preventDefault();
    return;
  });
};

export default setupGlobalErrorHandlers;