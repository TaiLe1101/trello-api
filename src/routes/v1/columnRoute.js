import express from "express";
import { columnController } from "~/controllers/columnController";
import { columnValidation } from "~/validations/columnValidation";

const Router = express.Router();

Router.route("/")
  .get()
  .post(columnValidation.createNew, columnController.createNew);

export const columnRoute = Router;
