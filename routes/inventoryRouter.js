import { Router } from "express";
import invController from "../controllers/inventoryController.js";
import validateItem from "../validators/itemValidator.js";

const inventoryRouter = new Router();

inventoryRouter.get("/", invController.getInventory);
inventoryRouter.post("/create", validateItem, invController.createItem);

export default inventoryRouter;
