import express from "express";
import { boardController } from "~/controllers/boardController";
import { boardValidation } from "~/validations/boardValidation";

const Router = express.Router();

Router.route("/")
  .get(boardController.getAllBoards)
  .post(boardValidation.createNew, boardController.createNew);

Router.route("/:id")
  .get(boardController.getDetail)
  .put(boardValidation.update, boardController.update);

export const boardRoute = Router;
