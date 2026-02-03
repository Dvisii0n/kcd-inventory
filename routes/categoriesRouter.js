import { Router } from "express";
import catController from "../controllers/categoriesController.js";

const categoriesRouter = new Router();

categoriesRouter.get("/", catController.getCategories);

export default categoriesRouter;
