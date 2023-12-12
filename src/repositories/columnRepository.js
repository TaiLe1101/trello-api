import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  INVALID_UPDATE_COLUMN_FIELDS,
} from "~/models/columnModel";
import { modelValidate } from "~/validations/modelValidation";

const createNew = async (data) => {
  try {
    const validData = await modelValidate.validateBeforeCreate(
      COLUMN_COLLECTION_SCHEMA,
      data
    );

    const newColumnToAdd = {
      ...validData,
      boardId: new ObjectId(validData.boardId),
    };

    const createdColumn = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .insertOne(newColumnToAdd);
    return createdColumn;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    const column = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return column;
  } catch (error) {
    throw new Error(error);
  }
};

const pushCardOrderIds = async (card) => {
  try {
    const result = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: new ObjectId(card.columnId),
        },
        {
          $push: {
            cardOrderIds: new ObjectId(card._id),
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

const update = async (columnId, updateData) => {
  try {
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_COLUMN_FIELDS.includes(fieldName))
        delete updateData[fieldName];
    });

    const result = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: new ObjectId(columnId),
        },
        {
          $set: updateData,
        },
        {
          returnDocument: "after",
        }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const columnRepository = {
  createNew,
  findOneById,
  pushCardOrderIds,
  update,
};
