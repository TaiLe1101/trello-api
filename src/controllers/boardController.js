// DevT | exampleController file

import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";

const getAllBoards = async (req, res, next) => {
  try {
    const boards = await boardService.getAllBoards();
    return res.status(StatusCodes.OK).json(boards);
  } catch (error) {
    next(error);
  }
};

const createNew = async (req, res, next) => {
  try {
    const createdBoard = await boardService.createNew(req.body);

    return res.status(StatusCodes.CREATED).json(createdBoard);
  } catch (error) {
    next(error);
  }
};

const getDetail = async (req, res, next) => {
  const boardId = req.params.id;
  try {
    const board = await boardService.getDetail(boardId);
    return res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
  getAllBoards,
  getDetail,
};
