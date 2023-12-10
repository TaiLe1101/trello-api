import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
} from "~/models/cardModel";
import { modelValidate } from "~/validations/modelValidation";

const createNew = async (data) => {
  try {
    const validData = await modelValidate.validateBeforeCreate(
      CARD_COLLECTION_SCHEMA,
      data
    );

    const newCardToAdd = {
      ...validData,
      boardId: new ObjectId(validData.boardId),
      columnId: new ObjectId(validData.columnId),
    };

    const createdCard = await GET_DB()
      .collection(CARD_COLLECTION_NAME)
      .insertOne(newCardToAdd);
    return createdCard;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    const card = await GET_DB()
      .collection(CARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return card;
  } catch (error) {
    throw new Error(error);
  }
};

export const cardRepository = {
  createNew,
  findOneById,
};
