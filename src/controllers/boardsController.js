// DevT | exampleController file

import { StatusCodes } from "http-status-codes";

const createNew = (req, res, next) => {
  try {
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Post Board Route" });
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
};
