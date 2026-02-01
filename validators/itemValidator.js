import { body } from "express-validator";

const isIntError = (min, max) =>
	`should be an integer between ${min} and ${max}`;

const lengthError = (min, max) =>
	`should contain more than ${min} characters and less than ${max} characters`;

const isAplhaError = "should only contain letters";

const isFloatError = "should be a decimal number and no less than 0";

const validateItem = [
	body("name")
		.isAlpha("en-US", { ignore: " " })
		.withMessage(`Name ${isAplhaError}`)
		.isLength({ min: 3, max: 25 })
		.withMessage(`Name ${lengthError(3, 25)} `),

	body("quantity")
		.trim()
		.isInt({ min: 1, max: 50 })
		.withMessage(`Quantity ${isIntError(1, 50)}`),

	body("power")
		.isInt({ min: 0 })
		.withMessage(`Power should be higher than 0`),

	body("quality")
		.trim()
		.isInt({ min: 0, max: 100 })
		.withMessage("Quality should be no less than 0 and no higher than 100"),

	body("weight")
		.trim()
		.isFloat({ min: 0 })
		.withMessage(`Weight ${isFloatError}`),

	body("value")
		.trim()
		.isFloat({ min: 0 })
		.withMessage(`Value ${isFloatError}`),

	body("categoryId")
		.trim()
		.isInt()
		.withMessage("CategoryId should be an integer")
		.isInt({ min: 1 })
		.withMessage(`CategoryId should be higher than 0`),
];

export default validateItem;
