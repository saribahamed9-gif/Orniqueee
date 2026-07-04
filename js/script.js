
// ===============================
// ORNIQUE FULL WORKING SCRIPT
// ===============================

let cart = [];

// DOM
const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutForm = document.getElementById("checkout-form");

// ===============================
// SHOW PRODUCTS
// ===============================
function renderProducts() {

    productsContainer.innerHTML = "";

    products.forEach(product => {

        const div = document.createElement("div");

        div.className = "product";

        div.innerHTML = `
            <img src="${product.image}" width="150">
            <h3>${product.name}</h3>
            <p>৳${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productsContainer.appendChild(div);

    });

}

// ===============================
// ADD TO CART
// ===============================
function addToCart(id) {

    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// ===============================
// UPDATE CART
// ===============================
function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        const div = document.createElement("div");

        div.innerHTML = `
            <p>${item.name} (x${item.quantity})</p>
            <p>৳${item.price * item.quantity}</p>
        `;

        cartItems.appendChild(div);

    });

    cartTotal.innerText = total;
}

// ===============================
// CLEAR CART
// ===============================
clearCartBtn.addEventListener("click", () => {
    cart = [];
    updateCart();
});

// ===============================
// WHATSAPP ORDER
// ===============================
checkoutForm.addEventListener("submit", function (e) {

    e.preventDefault();

    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    let name = document.getElementById("customer-name").value;
    let phone = document.getElementById("customer-phone").value;
    let address = document.getElementById("customer-address").value;

    let message = `New Order%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}%0A%0AItems:%0A`;

    let total = 0;

    cart.forEach(item => {
        message += `${item.name} x${item.quantity} = ৳${item.price * item.quantity}%0A`;
        total += item.price * item.quantity;
    });

    message += `%0ATotal: ৳${total}`;

    let whatsappNumber = "8801577085192";

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

});

// ===============================
renderProducts();
