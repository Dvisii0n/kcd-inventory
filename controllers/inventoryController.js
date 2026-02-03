import queries from "../db/itemQueries.js";
import { matchedData, validationResult } from "express-validator";

async function getInventory(req, res) {
	try {
		const items = await queries.getItems();
		res.render("inventory", { title: "Inventory", items: items });
	} catch (error) {
		throw error;
	}
}

async function getCategoryItems(req, res) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.send(errors.array());
			return;
		}
		const { categoryName } = matchedData(req);
		const categoryItems = await queries.getCategoryItems(categoryName);
		res.render("inventory", { title: "Inventory", items: categoryItems });
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

async function updateItem(req, res) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.send(errors.array());
			return;
		}
		const itemData = matchedData(req);
		const { itemId } = itemData;
		delete itemData.itemId;
		await queries.updateItem(itemId, itemData);
		res.redirect("/");
	} catch (error) {
		throw error;
	}
}

async function deleteItem(req, res) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.send(errors.array());
			return;
		}
		const { itemId } = matchedData(req);
		await queries.deleteItem(itemId);
		res.redirect("/");
	} catch (error) {
		throw error;
	}
}

export default {
	getInventory,
	createItem,
	updateItem,
	deleteItem,
	getCategoryItems,
};
