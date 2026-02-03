import pool from "./pool.js";

async function getItems() {
	const { rows } = await pool.query(
		"SELECT items.id, items.name, quantity, power, quality, weight, value, categories.name AS category FROM items JOIN categories ON items.category_id = categories.id",
	);
	return rows;
}

async function getCategoryItems(categoryName) {
	const { rows } = await pool.query(
		`
         SELECT item.id, items.name, quantity, power, quality, weight, value, categories.name AS category
		 FROM items 
         JOIN categories ON items.category_id = categories.id 
         WHERE categories.name = $1
		`,
		[categoryName],
	);
	return rows;
}

async function createItem(itemData) {
	const { name, quantity, power, quality, weight, value, category_id } =
		itemData;
	await pool.query(
		"INSERT INTO items (name, quantity, power, quality, weight, value, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
		[name, quantity, power, quality, weight, value, category_id],
	);
}

async function updateItem(itemId, itemData) {
	const keys = Object.keys(itemData);
	const itemDataValues = Object.values(itemData);
	//itemId is the first item in values array, so params positions should start at 2 when constructing the query
	const valuesArray = [itemId, ...itemDataValues];
	let paramPos = 2;
	let fields = [];
	for (let key of keys) {
		fields.push(`${key} = $${paramPos}`);
		paramPos++;
	}

	const query = `UPDATE items SET ${fields.join(", ")} WHERE id = $1`;
	await pool.query(query, valuesArray);
}

async function deleteItem(itemId) {
	await pool.query("DELETE FROM items WHERE id = $1", [itemId]);
}

export default {
	getItems,
	createItem,
	updateItem,
	deleteItem,
	getCategoryItems,
};
