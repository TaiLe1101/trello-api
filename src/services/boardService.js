/* eslint-disable no-useless-catch */
import { boardRepository } from "~/repositories/boardRepository";
import { slugify } from "~/utils/formatters";

// DevT | exampleService file
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
};
