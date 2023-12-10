// DevT | index file
import express from "express";

import { boardRoute } from "./boardRoute";
import { columnRoute } from "./columnRoute";
import { cardRoute } from "./cardRoute";

const Router = express.Router();

/* BOARDS ROUTE */
Router.use("/boards", boardRoute);

/* COLUMNS ROUTE */
Router.use("/columns", columnRoute);

/* CARDS ROUTE */
Router.use("/cards", cardRoute);

export const APIsV1 = Router;
