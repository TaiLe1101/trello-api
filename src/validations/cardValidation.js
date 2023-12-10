import { StatusCodes } from "http-status-codes";
import Joi from "joi";

import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/constants";

const createNew = async (req, res, next) => {
  try {
    const correctCondition = Joi.object({
      boardId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
      columnId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
      title: Joi.string().required().min(3).max(50).trim().strict(),
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

export const cardValidation = {
  createNew,
};
