document.getElementById("addProductBtn").addEventListener("click", function() {
    document.getElementById("productForm").style.display = "block";
});

function saveProduct() {
    let name = document.getElementById("productName").value;
    let category = document.getElementById("productCategory").value;
    let price = document.getElementById("productPrice").value;
    let description = document.getElementById("productDescription").value;
    let image = document.getElementById("productImage").files[0];

    if (!name || !category || !price || !description || !image) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function(e) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.push({
            id: Date.now(),
            name,
            category,
            price,
            description,
            image: e.target.result,
            discount: false
        });
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();
        document.getElementById("productForm").reset();
        document.getElementById("productForm").style.display = "none";
    };
    reader.readAsDataURL(image);
}

function displayProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(product => {
        let productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <p>${product.discount ? `<span class="discount">Precio con descuento: $${product.price * 0.9}</span>` : `Precio: $${product.price}`}</p>
            <p>${product.description}</p>
            <div class="actions">
                <button onclick="editProduct(${product.id})">Editar</button>
                <button onclick="deleteProduct(${product.id})">Eliminar</button>
                <button onclick="applyDiscount(${product.id})">Aplicar Descuento</button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

function editProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    let product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById("productName").value = product.name;
    document.getElementById("productCategory").value = product.category;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productDescription").value = product.description;
    document.getElementById("productForm").style.display = "block";

    deleteProduct(id);
}

function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    products = products.filter(p => p.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

function applyDiscount(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    let product = products.find(p => p.id === id);
    if (product) {
        product.discount = true;
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();
    }
}

document.addEventListener("DOMContentLoaded", displayProducts);
