import { StatusCodes } from "http-status-codes";
import { constants } from "~/utils/constants";

// eslint-disable-next-line no-unused-vars
export const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: constants.__PROD__ ? undefined : err.stack,
  };

  res.status(responseError.statusCode).json(responseError);
};
