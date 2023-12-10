import { boardRepository } from "~/repositories/boardRepository";
import { columnRepository } from "~/repositories/columnRepository";

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody,
    };

    const createdColumn = await columnRepository.createNew(newColumn);
    const getNewColumn = await columnRepository.findOneById(
      createdColumn.insertedId.toString()
    );

    if (getNewColumn) {
      getNewColumn.cards = [];

      // update columnOrderIds
      await boardRepository.pushColumnOrderIds(getNewColumn);
    }

    return getNewColumn;
  } catch (error) {
    throw error;
  }
};

export const columnService = {
  createNew,
};
