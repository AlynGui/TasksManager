// success response
export const successResponse = (res, message, data = null, status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
    error: null
  });
};
// error response
export const errorResponse = (res, message, error = null, status = 500) => {
  console.error('Error Response:', { message, error });
  return res.status(status).json({
    success: false,
    message,
    data: null,
    error
  });
};