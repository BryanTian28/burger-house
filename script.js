function toggleNav() {
	const navLinks = document.getElementById("navLinks");
	navLinks.classList.toggle("show");
}

const cart = {};

function addToCart(item) {
	if (cart[item]) {
		cart[item]++;
	} else {
		cart[item] = 1;
	}
}

function cancelMenuItem(item) {
	delete cart[item];
	showModal();
}

function showModal() {
	const modal = document.getElementById("myModal");
	const modalContent = document.getElementById("modalContent");

	modalContent.innerHTML = "";

	if (Object.keys(cart).length === 0) {
		const emptyCartMsg = document.createElement("p");
		emptyCartMsg.textContent = "Your cart is empty.";
		modalContent.appendChild(emptyCartMsg);
	} else {
		const table = document.createElement("table");

		let subTotal = 0;
		const isSmallScreen = window.innerWidth <= 768;
		for (const item in cart) {
			if (cart.hasOwnProperty(item)) {
				const qty = cart[item];
				const price = qty * 20000;

				subTotal += price;

				if (isSmallScreen) {
					const row = table.insertRow();
					row.classList.add("cart-menus");

					const image = row.insertCell(0);
					const infoCell = row.insertCell(1);
					const cancelCell = row.insertCell(2);
					infoCell.classList.add("info-cell");
					const cancelButton = document.createElement("button");
					cancelButton.textContent = `X`;
					cancelButton.addEventListener("click", function () {
						cancelMenuItem(item);
					});

					if (item === "Burger 2") {
						const image1 = document.createElement("img");
						image1.src = "/assets/img/burger1.png";
						image.appendChild(image1);
					} else {
						const image2 = document.createElement("img");
						image2.src = "/assets/img/burger2.png";
						image.appendChild(image2);
					}

					infoCell.innerHTML = `${item}<br>x ${qty}<br>Rp. ${price.toLocaleString(
						"id-ID"
					)}`;
					cancelCell.appendChild(cancelButton);
				} else {
					const row = table.insertRow();
					row.classList.add("cart-menus");

					const image = row.insertCell(0);
					const name = row.insertCell(1);
					const qtyCell = row.insertCell(2);
					const priceCell = row.insertCell(3);
					const cancelCell = row.insertCell(4);
					const cancelButton = document.createElement("button");
					cancelButton.textContent = `X`;
					cancelButton.addEventListener("click", function () {
						cancelMenuItem(item);
					});

					cancelCell.appendChild(cancelButton);

					name.textContent = item;
					qtyCell.textContent = `x ${qty}`;
					priceCell.textContent = `Rp. ${price.toLocaleString(
						"id-ID"
					)}`;
					if (item === "Burger 2") {
						const image1 = document.createElement("img");
						image1.src = "/assets/img/burger1.png";
						image.appendChild(image1);
					} else {
						const image2 = document.createElement("img");
						image2.src = "/assets/img/burger2.png";
						image.appendChild(image2);
					}
				}
			}
		}

		if (isSmallScreen) {
			// *SubTotal
			const subtotalRow = table.insertRow();
			const subtotalImgCell = subtotalRow.insertCell(0);
			const subtotalNameCell = subtotalRow.insertCell(1);
			const subtotalQtyCell = subtotalRow.insertCell(2);
			subtotalImgCell.classList.add("counter");
			subtotalQtyCell.classList.add("currency-cell");

			subtotalImgCell.textContent = "SUB-TOTAL";
			subtotalQtyCell.textContent = subTotal.toLocaleString("id-ID");

			// * Tax
			const taxRow = table.insertRow();
			const taxImgCell = taxRow.insertCell(0);
			const taxNameCell = taxRow.insertCell(1);
			const taxQtyCell = taxRow.insertCell(2);
			taxImgCell.classList.add("counter");
			taxQtyCell.classList.add("currency-cell");

			let taxPrice = subTotal * 0.2;
			taxImgCell.textContent = "TAX";
			taxQtyCell.textContent = taxPrice.toLocaleString("id-ID");

			// *Total
			const totalRow = table.insertRow();
			const totalImgCell = totalRow.insertCell(0);
			const totalNameCell = totalRow.insertCell(1);
			const totalQtyCell = totalRow.insertCell(2);
			totalImgCell.classList.add("counter");
			totalQtyCell.classList.add("currency-cell");

			let total = subTotal + taxPrice;
			totalImgCell.textContent = "TOTAL";
			totalQtyCell.textContent = total.toLocaleString("id-ID");

			// *Button
			let buttonRow = table.insertRow();
			const buttonImgCell = buttonRow.insertCell(0);
			const buttonNameCell = buttonRow.insertCell(1);
			const buttonQtyCell = buttonRow.insertCell(2);

			const continueButton = document.createElement("button");
			const checkoutButton = document.createElement("button");

			continueButton.textContent = "Continue Shopping";
			continueButton.setAttribute("id", "continue-btn");
			continueButton.addEventListener("click", closeModal);
			checkoutButton.textContent = "Checkout";
			checkoutButton.setAttribute("id", "checkout-btn");
			buttonImgCell.appendChild(continueButton);
			buttonQtyCell.appendChild(checkoutButton);

			modalContent.appendChild(table);
		} else {
			// *SubTotal
			const subtotalRow = table.insertRow();
			const subtotalImgCell = subtotalRow.insertCell(0);
			const subtotalNameCell = subtotalRow.insertCell(1);
			const subtotalQtyCell = subtotalRow.insertCell(2);
			subtotalQtyCell.classList.add("counter");
			const subtotalPriceCell = subtotalRow.insertCell(3);
			const subtotalCancelCell = subtotalRow.insertCell();
			subtotalCancelCell.classList.add("currency-cell");

			subtotalQtyCell.textContent = "SUB-TOTAL";
			subtotalCancelCell.textContent = subTotal.toLocaleString("id-ID");

			// * Tax
			const taxRow = table.insertRow();
			const taxImgCell = taxRow.insertCell(0);
			const taxNameCell = taxRow.insertCell(1);
			const taxQtyCell = taxRow.insertCell(2);
			taxQtyCell.classList.add("counter");
			const taxPriceCell = taxRow.insertCell(3);
			const taxCancelCell = taxRow.insertCell(4);
			taxCancelCell.classList.add("currency-cell");

			let taxPrice = subTotal * 0.2;
			taxQtyCell.textContent = "TAX";
			taxCancelCell.textContent = taxPrice.toLocaleString("id-ID");

			// *Total
			const totalRow = table.insertRow();
			const totalImgCell = totalRow.insertCell(0);
			const totalNameCell = totalRow.insertCell(1);
			const totalQtyCell = totalRow.insertCell(2);
			totalQtyCell.classList.add("counter");
			const totalPriceCell = totalRow.insertCell(3);
			const totalCancelCell = totalRow.insertCell(4);
			totalCancelCell.classList.add("currency-cell");

			let total = subTotal + taxPrice;
			totalQtyCell.textContent = "TOTAL";
			totalCancelCell.textContent = total.toLocaleString("id-ID");

			const fillerRow = table.ins;
			const transactionRow = table.insertRow();
			transactionRow.classList.add("transaction-buttons");
			const transactionImgCell = transactionRow.insertCell(0);
			const transactionNameCell = transactionRow.insertCell(1);
			const transactionQtyCell = transactionRow.insertCell(2);
			transactionQtyCell.classList.add("counter");
			const transactionPriceCell = transactionRow.insertCell(3);
			const transactionCancelCell = transactionRow.insertCell(4);

			const continueButton = document.createElement("button");
			const checkoutButton = document.createElement("button");

			continueButton.innerHTML = "Continue<br>Shopping";
			continueButton.setAttribute("id", "continue-btn");
			continueButton.addEventListener("click", closeModal);
			checkoutButton.textContent = "Checkout";
			checkoutButton.setAttribute("id", "checkout-btn");
			transactionImgCell.appendChild(continueButton);
			transactionCancelCell.appendChild(checkoutButton);
			modalContent.appendChild(table);
		}
	}

	modal.style.display = "flex";
	modal.style.zIndex = 2;
}

function closeModal() {
	const modal = document.getElementById("myModal");
	modal.style.display = "none";
}

window.addEventListener("click", function (event) {
	const modal = document.getElementById("myModal");
	if (event.target === modal) {
		closeModal();
	}

	const isClickInsideNavbar = navLinks.contains(event.target);
	const isBurgerMenuClicked = event.target.closest(".burger-menu");

	if (!isClickInsideNavbar && !isBurgerMenuClicked) {
		navLinks.classList.remove("show");
	}
});
