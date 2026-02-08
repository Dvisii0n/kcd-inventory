import { matchedData, validationResult } from "express-validator";
import categoriesQueries from "../db/categoriesQueries.js";
import itemQueries from "../db/itemQueries.js";

async function validationErrorHandler(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json(errors.array());
		return;
	} else {
		next();
	}
}

async function createFormValidationHandler(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const categories = await categoriesQueries.getCategories();
		res
			.status(400)
			.render("createForm", { categories: categories, errors: errors.array() });
		return;
	} else {
		next();
	}
}

async function updateFormValidationHandler(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const { itemId } = matchedData(req);
		const categories = await categoriesQueries.getCategories();
		const [item] = await itemQueries.getItem(itemId);
		res.status(400).render("updateForm", {
			item: item,
			categories: categories,
			currentCategoryId: item["category_id"],
			errors: errors.array(),
		});
		return;
	} else {
		next();
	}
}
export {
	validationErrorHandler,
	createFormValidationHandler,
	updateFormValidationHandler,
};
