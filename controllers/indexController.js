function getIndex(req, res) {
	try {
		res.render("index", { title: "KCD Inventory" });
	} catch (error) {
		throw error;
	}
}

export default getIndex;
