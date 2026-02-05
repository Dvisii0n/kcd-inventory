import { body, param } from "express-validator";

const categoryValidationRules = {
	categoryNameBody: body("categoryName")
		.trim()
		.isAlpha()
		.withMessage(`categoryName should only contain letters`)
		.isLength({ min: 3, max: 25 })
		.withMessage(
			"categoryName length should be at least 3 characters and no more than 25 characters",
		),

	categoryParam: param("categoryName")
		.trim()
		.isAlpha()
		.withMessage(`categoryName should only contain letters`)
		.isLength({ min: 3, max: 25 })
		.withMessage(
			"categoryName length should be at least 3 characters and no more than 25 characters",
		),

	categoryId: param("categoryId")
		.exists()
		.isInt({ min: 1 })
		.withMessage("Category id must be an integer"),
};

const validateCategoryName = categoryValidationRules.categoryNameBody;
const validateCategoryParam = categoryValidationRules.categoryParam;
const validateCategoryId = categoryValidationRules.categoryId;

const validateCategoryUpdate = [
	categoryValidationRules.categoryNameBody,
	categoryValidationRules.categoryId,
];

export default {
	validateCategoryName,
	validateCategoryId,
	validateCategoryParam,
	validateCategoryUpdate,
};
