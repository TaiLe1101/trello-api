// DevT | exampleValidation file
import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  try {
    const correctCondition = Joi.object({
      title: Joi.string().required().min(3).max(50).trim().strict(),
      description: Joi.string().required().min(3).max(256).trim().strict(),
    });

    await correctCondition.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    const errorMessages = new Error(error).message;
    const apiError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessages
    );
    next(apiError);
  }
};

export const boardValidation = {
  createNew,
};
