export const asyncHandler = (requestHandler) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error));
}