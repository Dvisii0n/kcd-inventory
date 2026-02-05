import queries from "../db/itemQueries.js";
import { matchedData } from "express-validator";

const inventoryURL = "/inventory";
async function getInventory(req, res) {
	try {
		const items = await queries.getItems();
		res.render("inventory", { title: "Inventory", items: items });
	} catch (error) {
		throw error;
	}
}

async function createItem(req, res) {
	try {
		const itemData = matchedData(req);
		await queries.createItem(itemData);
		res.redirect(inventoryURL);
	} catch (error) {
		throw error;
	}
}

async function updateItem(req, res) {
	try {
		const itemData = matchedData(req);
		const { itemId } = itemData;
		delete itemData.itemId;
		await queries.updateItem(itemId, itemData);
		res.redirect(inventoryURL);
	} catch (error) {
		throw error;
	}
}

async function deleteItem(req, res) {
	try {
		const { itemId } = matchedData(req);
		await queries.deleteItem(itemId);
		res.redirect(inventoryURL);
	} catch (error) {
		throw error;
	}
}

export default {
	getInventory,
	createItem,
	updateItem,
	deleteItem,
};
