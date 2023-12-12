import express from "express";
import { columnController } from "~/controllers/columnController";
import { columnValidation } from "~/validations/columnValidation";

const Router = express.Router();

Router.route("/")
  .get()
  .post(columnValidation.createNew, columnController.createNew);

Router.route("/:id")
  .get()
  .put(columnValidation.update, columnController.update);

export const columnRoute = Router;
