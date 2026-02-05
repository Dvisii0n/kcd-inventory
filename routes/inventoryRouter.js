import { Router } from "express";
import invController from "../controllers/inventoryController.js";
import itemValidator from "../validators/itemValidator.js";
import categoriesRouter from "./categoriesRouter.js";
import { validationErrorHandler } from "../validators/validationUtils.js";

const inventoryRouter = new Router();

inventoryRouter.use("/categories", categoriesRouter);

inventoryRouter.get("/", invController.getInventory);

inventoryRouter.post(
	"/create",
	itemValidator.validateCreateItem,
	validationErrorHandler,
	invController.createItem,
);

inventoryRouter.put(
	"/update/:itemId",
	itemValidator.validateUpdateItem,
	validationErrorHandler,
	invController.updateItem,
);

inventoryRouter.delete(
	"/delete/:itemId",
	itemValidator.validateDeleteItem,
	validationErrorHandler,
	invController.deleteItem,
);

export default inventoryRouter;
