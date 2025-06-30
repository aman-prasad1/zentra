export const errorMiddleware = (error, req, res, next) => {
    error.message = error.message || "Internal Server Error";
    error.statusCode = error.statusCode || 500;
    console.log(error);
    res.status(error.statusCode).json({
        success: false,
        message: error.message
    })
};