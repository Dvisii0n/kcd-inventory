async function deleteItem(itemId, itemName) {
	const confirm = window.confirm(`Are you sure you wanna delete ${itemName}`);
	if (confirm) {
		await fetch(`/inventory/delete/${itemId}`, {
			method: "DELETE",
		});
		window.location.href = "/inventory";
	}
}
