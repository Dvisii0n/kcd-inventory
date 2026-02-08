import { Router } from "express";
import invController from "../controllers/inventoryController.js";
import itemValidator from "../validators/itemValidator.js";
import categoriesRouter from "./categoriesRouter.js";
import {
	createFormValidationHandler,
	updateFormValidationHandler,
	validationErrorHandler,
} from "../validators/validationUtils.js";

const inventoryRouter = new Router();

inventoryRouter.use("/categories", categoriesRouter);

inventoryRouter.get("/", invController.getInventory);

inventoryRouter.get(
	"/forms/update/:itemId",
	itemValidator.validateItemId,
	invController.getUpdateForm,
);

inventoryRouter.get("/forms/create", invController.getCreateForm);
inventoryRouter.post(
	"/create",
	itemValidator.validateCreateItem,
	createFormValidationHandler,
	invController.createItem,
);

inventoryRouter.post(
	"/update/:itemId",
	itemValidator.validateUpdateItem,
	updateFormValidationHandler,
	invController.updateItem,
);

inventoryRouter.delete(
	"/delete/:itemId",
	itemValidator.validateDeleteItem,
	validationErrorHandler,
	invController.deleteItem,
);

export default inventoryRouter;
