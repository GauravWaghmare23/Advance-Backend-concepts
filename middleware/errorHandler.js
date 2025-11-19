class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.name = "APIError";

    Error.captureStackTrace(this, this.constructor);
  }
}

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
  }

  //mongoose validation handler
  else if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    return res.status(400).json({
      status: "Error",
      message: `Invalid input data: ${message}`,
    });
  }

  // unexpected error
  else {
    return res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  APIError,
  asyncHandler,
  globalErrorHandler,
};
