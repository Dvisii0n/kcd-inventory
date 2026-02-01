import queries from "../db/queries.js";
import { matchedData, validationResult } from "express-validator";

async function getInventory(req, res) {
	try {
		const items = await queries.getItems();
		console.log(items);
		res.render("inventory", { title: "Inventory", items: items });
	} catch (error) {
		throw error;
	}
}
async function createItem(req, res) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.send(errors.array());
			return;
		}
		const itemData = matchedData(req);
		await queries.createItem(itemData);
		res.redirect("/");
	} catch (error) {
		throw error;
	}
}

export default { getInventory, createItem };
