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

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };

    const updatedColumn = await columnRepository.update(columnId, updateData);

    return updatedColumn;
  } catch (error) {
    throw error;
  }
};

export const columnService = {
  createNew,
  update,
};
