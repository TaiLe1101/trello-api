/* eslint-disable no-useless-catch */
import { boardRepository } from "~/repositories/boardRepository";
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

export const boardService = {
  createNew,
  getAllBoards,
};
