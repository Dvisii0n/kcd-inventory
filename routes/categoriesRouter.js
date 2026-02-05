import { Router } from "express";
import catController from "../controllers/categoriesController.js";
import catValidator from "../validators/categoriesValidator.js";
import { validationErrorHandler } from "../validators/validationUtils.js";

const categoriesRouter = new Router();

categoriesRouter.get("/", catController.getCategories);

categoriesRouter.get(
	"/items/:categoryName",
	catValidator.validateCategoryParam,
	validationErrorHandler,
	catController.getCategoryItems,
);

categoriesRouter.post(
	"/create",
	catValidator.validateCategoryName,
	validationErrorHandler,
	catController.createCategory,
);

categoriesRouter.put(
	"/update/:categoryId",
	catValidator.validateCategoryUpdate,
	validationErrorHandler,
	catController.updateCategory,
);

categoriesRouter.delete(
	"/delete/:categoryId",
	catValidator.validateCategoryId,
	validationErrorHandler,
	catController.deleteCategory,
);

export default categoriesRouter;
