import { body, param } from "express-validator";

const isIntError = (min, max) =>
	`should be an integer between ${min} and ${max}`;

const lengthError = (min, max) =>
	`should contain more than ${min} characters and less than ${max} characters`;

const isAplhaError = "should only contain letters";

const isFloatError = "should be a decimal number and no less than 0";

const itemValidationRules = {
	itemId: param("itemId")
		.exists()
		.isInt({ min: 1 })
		.withMessage("Nice try idiot"),
	name: body("name")
		.isAlpha("en-US", { ignore: " " })
		.withMessage(`Name ${isAplhaError}`)
		.isLength({ min: 3, max: 25 })
		.withMessage(`Name ${lengthError(3, 25)} `),

	quantity: body("quantity")
		.trim()
		.isInt({ min: 1, max: 50 })
		.withMessage(`Quantity ${isIntError(1, 50)}`),

	power: body("power")
		.isInt({ min: 0 })
		.withMessage(`Power should be higher than 0`),

	quality: body("quality")
		.trim()
		.isInt({ min: 0, max: 100 })
		.withMessage("Quality should be no less than 0 and no higher than 100"),

	weight: body("weight")
		.trim()
		.isFloat({ min: 0 })
		.withMessage(`Weight ${isFloatError}`),

	value: body("value")
		.trim()
		.isFloat({ min: 0 })
		.withMessage(`Value ${isFloatError}`),

	categoryId: body("category_id")
		.trim()
		.isInt()
		.withMessage("CategoryId should be an integer")
		.isInt({ min: 1 })
		.withMessage(`CategoryId should be higher than 0`),
};

const validateCreateItem = [
	itemValidationRules.name,
	itemValidationRules.quantity,
	itemValidationRules.power,
	itemValidationRules.quality,
	itemValidationRules.weight,
	itemValidationRules.value,
	itemValidationRules.categoryId,
];

const validateUpdateItem = [
	itemValidationRules.itemId,
	itemValidationRules.name.optional(),
	itemValidationRules.quantity.optional(),
	itemValidationRules.power.optional(),
	itemValidationRules.quality.optional(),
	itemValidationRules.weight.optional(),
	itemValidationRules.value.optional(),
	itemValidationRules.categoryId.optional(),
];

const validateDeleteItem = itemValidationRules.itemId;

export default {
	validateCreateItem,
	validateUpdateItem,
	validateDeleteItem,
};
