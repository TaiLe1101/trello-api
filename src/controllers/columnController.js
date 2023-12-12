import { StatusCodes } from "http-status-codes";
import { columnService } from "~/services/columnService";

const createNew = async (req, res, next) => {
  try {
    const createdColumn = await columnService.createNew(req.body);

    return res.status(StatusCodes.CREATED).json(createdColumn);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const boardId = req.params.id;
  const reqBody = req.body;
  try {
    const updatedBoard = await columnService.update(boardId, reqBody);
    return res.status(StatusCodes.OK).json(updatedBoard);
  } catch (error) {
    next(error);
  }
};

export const columnController = {
  createNew,
  update,
};
