// DevT | index file
import express from "express";
import { boardRoutes } from "./boardRoute";

const Router = express.Router();

/* BOARDS ROUTE */
Router.use("/boards", boardRoutes);

export const APIsV1 = Router;
