/* eslint-disable no-useless-catch */
import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";

import { boardRepository } from "~/repositories/boardRepository";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatters";

const getAllBoards = async () => {
  try {
    const boards = await boardRepository.getAllBoards();
    return boards;
  } catch (error) {
    throw error;
  }
};

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    const createdBoard = await boardRepository.createNew(newBoard);

    return createdBoard;
  } catch (error) {
    throw error;
  }
};

const getDetail = async (boardId) => {
  try {
    const board = await boardRepository.getDetail(boardId);
    if (!board) throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");

    const resBoard = cloneDeep(board);

    resBoard.columns.forEach((column) => {
      column.cards = resBoard.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      );
    });

    delete resBoard.cards;

    return resBoard;
  } catch (error) {
    throw error;
  }
};

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };

    const updatedBoard = await boardRepository.update(boardId, updateData);

    return updatedBoard;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
  getAllBoards,
  getDetail,
  update,
};
