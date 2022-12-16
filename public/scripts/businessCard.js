const createBusinessCard = async (event) => {
	event.preventDefault();

	// get form values
	const formData = new FormData(event.target);
	const formEntries = Object.fromEntries(formData.entries());

	const res = await fetch("/api/businessCard/addBusinessCard", {
		credentials: "include",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({ ...formEntries, businessCardId: Date.now() }),
	});

	const response = await res.json();

	if (res.status === "success") {
		const image = document.getElementById("qrImg");
		image.src = response.data.imageUrl;
	}
};
