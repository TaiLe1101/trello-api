import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { boardModel } from "~/models/boardModel";
import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
import { modelValidate } from "~/validations/modelValidation";

const getAllBoards = async () => {
  try {
    const boards = await GET_DB()
      .collection(boardModel.BOARD_COLLECTION_NAME)
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
      boardModel.BOARD_COLLECTION_SCHEMA,
      data
    );

    const createdBoard = await GET_DB()
      .collection(boardModel.BOARD_COLLECTION_NAME)
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
      .collection(boardModel.BOARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return board;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetail = async (boardId) => {
  try {
    const board = await GET_DB()
      .collection(boardModel.BOARD_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(boardId),
            _destroy: false,
          },
        },
        {
          $lookup: {
            from: columnModel.COLUMN_COLLECTION_NAME,
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        {
          $lookup: {
            from: cardModel.CARD_COLLECTION_NAME,
            localField: "_id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ])
      .toArray();
    return board[0] || {};
  } catch (error) {
    throw new Error(error);
  }
};

export const boardRepository = {
  createNew,
  findOneById,
  getAllBoards,
  getDetail,
};
