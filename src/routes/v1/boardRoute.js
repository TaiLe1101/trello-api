// DevT | index file
import express from "express";
import { boardController } from "~/controllers/boardsController";
import { boardValidation } from "~/validations/boardValidation";

const Router = express.Router();

Router.route("/")
  .get(boardController.getAllBoards)
  .post(boardValidation.createNew, boardController.createNew);

export const boardRoutes = Router;
