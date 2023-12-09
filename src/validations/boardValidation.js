import { StatusCodes } from "http-status-codes";
import Joi from "joi";

import ApiError from "~/utils/ApiError";
import { BOARD_TYPE } from "~/utils/constants";

const createNew = async (req, res, next) => {
  try {
    const correctCondition = Joi.object({
      title: Joi.string().required().min(3).max(50).trim().strict(),
      description: Joi.string().required().min(3).max(256).trim().strict(),
      type: Joi.string()
        .valid(BOARD_TYPE.PUBLIC, BOARD_TYPE.PRIVATE)
        .required(),
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
