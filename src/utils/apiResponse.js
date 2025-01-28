/**
 * Utility function to create consistent API responses
 * @param {number} status - HTTP status code
 * @param {string} message - Response message
 * @param {object|null} data - Response data
 * @param {string|null} error - Error message if any
 * @returns {Response} - Formatted Response object
 */
export function createApiResponse(status, message, data = null, error = null) {
  return new Response(
    JSON.stringify({
      success: status >= 200 && status < 300,
      message,
      data,
      error
    }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Enable CORS
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    }
  );
}
