import { validationResult } from "express-validator";

async function validationErrorHandler(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json(errors.array());
		return;
	} else {
		next();
	}
}

export { validationErrorHandler };
