import { ObjectId } from "mongodb";

import { GET_DB } from "~/config/mongodb";
import {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
} from "~/models/boardModel";
import { CARD_COLLECTION_NAME } from "~/models/cardModel";
import { COLUMN_COLLECTION_NAME } from "~/models/columnModel";
import { modelValidate } from "~/validations/modelValidation";

const getAllBoards = async () => {
  try {
    const boards = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .find()
      .toArray();

    return boards;
  } catch (error) {
    throw new Error(error);
  }
};

const createNew = async (data) => {
  try {
    const validData = await modelValidate.validateBeforeCreate(
      BOARD_COLLECTION_SCHEMA,
      data
    );

    const createdBoard = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .insertOne(validData);
    const getNewBoard = await findOneById(createdBoard.insertedId.toString());
    return getNewBoard;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    const board = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return board;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetail = async (boardId) => {
  try {
    const board = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(boardId),
            _destroy: false,
          },
        },
        {
          $lookup: {
            from: COLUMN_COLLECTION_NAME,
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        {
          $lookup: {
            from: CARD_COLLECTION_NAME,
            localField: "_id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ])
      .toArray();
    return board[0] || null;
  } catch (error) {
    throw new Error(error);
  }
};

const pushColumnOrderIds = async (column) => {
  try {
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: new ObjectId(column.boardId),
        },
        {
          $push: {
            columnOrderIds: new ObjectId(column._id),
          },
        },
        {
          returnDocument: "after",
        }
      );
    return result || null;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (boardId, updateData) => {
  try {
    Object.keys(updateData).forEach((fieldName) => {
      if (modelValidate.INVALID_UPDATE_FIELDS.includes(fieldName))
        delete updateData[fieldName];
    });

    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: new ObjectId(boardId),
        },
        {
          $set: updateData,
        },
        {
          returnDocument: "after",
        }
      );
    return result || null;
  } catch (error) {
    throw new Error(error);
  }
};

export const boardRepository = {
  createNew,
  findOneById,
  getAllBoards,
  getDetail,
  pushColumnOrderIds,
  update,
};
