import pool from "./pool.js";

async function getItems() {
	const { rows } = await pool.query(
		"SELECT items.name, quantity, power, quality, weight, value, categories.name AS category FROM items JOIN categories ON items.category_id = categories.id",
	);
	return rows;
}

async function createItem(itemData) {
	const { name, quantity, power, quality, weight, value, categoryId } =
		itemData;
	await pool.query(
		"INSERT INTO items (name, quantity, power, quality, weight, value, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
		[name, quantity, power, quality, weight, value, categoryId],
	);
}
export default { getItems, createItem };
