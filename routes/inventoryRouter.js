import { Router } from "express";
import invController from "../controllers/inventoryController.js";
import itemValidator from "../validators/itemValidator.js";

const inventoryRouter = new Router();

inventoryRouter.get("/", invController.getInventory);
inventoryRouter.post(
	"/create",
	itemValidator.validateCreateItem,
	invController.createItem,
);

inventoryRouter.put(
	"/update/:id",
	itemValidator.validateUpdateItem,
	invController.updateItem,
);

export default inventoryRouter;
