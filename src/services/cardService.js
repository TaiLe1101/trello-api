import { cardRepository } from "~/repositories/cardRepository";
import { columnRepository } from "~/repositories/columnRepository";

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody,
    };

    const createdCard = await cardRepository.createNew(newCard);
    const getNewCard = await cardRepository.findOneById(
      createdCard.insertedId.toString()
    );

    if (getNewCard) {
      // update cardOrderIds
      await columnRepository.pushCardOrderIds(getNewCard);
    }

    return getNewCard;
  } catch (error) {
    throw error;
  }
};

export const cardService = {
  createNew,
};
