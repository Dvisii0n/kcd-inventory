import pool from "./pool.js";

async function getCategories() {
	const { rows } = await pool.query("SELECT * FROM categories");
	return rows;
}

async function getCategoryItems(categoryName) {
	const { rows } = await pool.query(
		`
         SELECT items.id, items.name, quantity, power, quality, weight, value, categories.name AS category
		 FROM items 
         JOIN categories ON items.category_id = categories.id 
         WHERE categories.name = $1
		`,
		[categoryName],
	);
	return rows;
}

async function createCategory(categoryName) {
	await pool.query("INSERT INTO categories (name) VALUES ($1)", [
		categoryName,
	]);
}

async function updateCategory(categoryId, newCategoryName) {
	await pool.query("UPDATE categories SET name = $2 WHERE id = $1", [
		categoryId,
		newCategoryName,
	]);
}

async function deleteCategory(categoryId) {
	await pool.query("DELETE FROM categories WHERE id = $1", [categoryId]);
}

export default {
	getCategories,
	getCategoryItems,
	createCategory,
	updateCategory,
	deleteCategory,
};
