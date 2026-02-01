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

async function updateItem(itemDataWithId) {
	const valuesArray = Object.values(itemDataWithId);
	let i = 2;
	let fields = [];
	for (let key of Object.keys(itemDataWithId)) {
		if (key === "id") continue;
		fields.push(`${key} = $${i}`);
		i++;
	}

	const query = `UPDATE items SET ${fields.join(", ")} WHERE id = $1`;
	await pool.query(query, valuesArray);
}
export default { getItems, createItem, updateItem };
