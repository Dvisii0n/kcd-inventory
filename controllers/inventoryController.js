import itemQueries from "../db/itemQueries.js";
import categoriesQueries from "../db/categoriesQueries.js";
import { matchedData } from "express-validator";

const inventoryURL = "/inventory";
async function getInventory(req, res) {
	try {
		const items = await itemQueries.getItems();
		res.render("inventory", { title: "Inventory", items: items });
	} catch (error) {
		throw error;
	}
}

async function getCreateForm(req, res) {
	try {
		const categories = await categoriesQueries.getCategories();
		res.render("createForm", { categories: categories, errors: null });
	} catch (error) {
		throw error;
	}
}

async function getUpdateForm(req, res) {
	try {
		const { itemId } = matchedData(req);

		const categories = await categoriesQueries.getCategories();
		const [item] = await itemQueries.getItem(itemId);
		res.render("updateForm", {
			item: item,
			categories: categories,
			currentCategoryId: item["category_id"],
			errors: null,
		});
	} catch (error) {
		throw error;
	}
}

async function createItem(req, res) {
	try {
		const itemData = matchedData(req);
		await itemQueries.createItem(itemData);
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
		await itemQueries.updateItem(itemId, itemData);
		res.redirect(inventoryURL);
	} catch (error) {
		throw error;
	}
}

async function deleteItem(req, res) {
	try {
		const { itemId } = matchedData(req);
		await itemQueries.deleteItem(itemId);
		res.redirect(inventoryURL);
	} catch (error) {
		throw error;
	}
}

export default {
	getInventory,
	getCreateForm,
	getUpdateForm,
	createItem,
	updateItem,
	deleteItem,
};
