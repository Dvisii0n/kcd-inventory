import categoriesQueries from "../db/categoriesQueries.js";
async function getCategories(req, res) {
	try {
		const categories = await categoriesQueries.getCategories();
		res.render("categories", { title: "Categories", categories: categories });
	} catch (error) {
		throw error;
	}
}

export default {
	getCategories,
};
