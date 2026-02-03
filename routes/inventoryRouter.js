import { Router } from "express";
import invController from "../controllers/inventoryController.js";
import itemValidator from "../validators/itemValidator.js";

const inventoryRouter = new Router();

inventoryRouter.get("/", invController.getInventory);

inventoryRouter.get(
	"/:categoryName",
	itemValidator.validateCategoryName,
	invController.getCategoryItems,
);

inventoryRouter.post(
	"/create",
	itemValidator.validateCreateItem,
	invController.createItem,
);

inventoryRouter.put(
	"/update/:itemId",
	itemValidator.validateUpdateItem,
	invController.updateItem,
);

inventoryRouter.delete(
	"/delete/:itemId",
	itemValidator.validateDeleteItem,
	invController.deleteItem,
);

export default inventoryRouter;
