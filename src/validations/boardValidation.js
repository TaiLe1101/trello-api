// DevT | exampleValidation file
import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createNew = async (req, res) => {
  try {
    const correctCondition = Joi.object({
      title: Joi.string().required().min(3).max(50).trim().strict(),
      description: Joi.string().required().min(3).max(256).trim().strict(),
    });

    await correctCondition.validateAsync(req.body, { abortEarly: false });

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Post Board Route" });
  } catch (error) {
    console.log("[ERROR] 👉", error);
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ errors: new Error(error).message });
  }
};

export const boardValidation = {
  createNew,
};
