import categoriesQueries from "../db/categoriesQueries.js";
import { matchedData } from "express-validator";

const categoriesURL = "/inventory/categories";

async function getCategories(req, res) {
	try {
		const categories = await categoriesQueries.getCategories();
		res.render("categories", {
			title: "Categories",
			categories: categories,
		});
	} catch (error) {
		throw error;
	}
}

async function getCategoryItems(req, res) {
	try {
		const { categoryName } = matchedData(req);
		const categoryItems =
			await categoriesQueries.getCategoryItems(categoryName);
		res.render("inventory", { title: "Inventory", items: categoryItems });
	} catch (error) {
		throw error;
	}
}

async function createCategory(req, res) {
	try {
		const { categoryName } = matchedData(req);
		await categoriesQueries.createCategory(categoryName);
		res.redirect(categoriesURL);
	} catch (error) {
		throw error;
	}
}

async function updateCategory(req, res) {
	try {
		const { categoryId, categoryName } = matchedData(req);
		console.log(matchedData(req));
		await categoriesQueries.updateCategory(categoryId, categoryName);
		res.redirect(categoriesURL);
	} catch (error) {
		throw error;
	}
}

async function deleteCategory(req, res) {
	try {
		const { categoryId } = matchedData(req);
		await categoriesQueries.deleteCategory(categoryId);
		res.redirect(categoriesURL);
	} catch (error) {
		throw error;
	}
}

export default {
	getCategories,
	getCategoryItems,
	createCategory,
	updateCategory,
	deleteCategory,
};
