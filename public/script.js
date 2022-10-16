function postProducts( name, brand, price ) {
    fetch('/products', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: name,
        brand: brand,
        price: price,
    }),
}).then(res => {
    if (res.ok) return res.json();
    return "Failed to update product"
    }).then(data => console.log(data));

}

function deleteProduct( id ) {
    fetch(`/products/${id}`, {
        method: 'DELETE',
    }).then(res => {
        if (res.ok) return res.text();
        return "Failed to delete";
    });

}

var allProducts

function getProducts(next) {
    fetch('/products', {
        method: 'GET',
    }).then(res => {
        if (res.ok) return res.json();
        return "Failed to fetch products";
    }).then(json => {
        allProducts = json;
        next();
    });
};

function generateTableContent() {
    var table = document.querySelector(".products-table")
    var productsResultJson = Array.from(allProducts);
    productsResultJson.forEach(function callback(row, index) {
        const newRow = table.insertRow();

        const idCell = newRow.insertCell();
        const nameCell = newRow.insertCell();
        const brandCell = newRow.insertCell();
        const priceCell = newRow.insertCell();
        const deleteButtonCell = newRow.insertCell();
        const deleteButton = document.body.appendChild(document.createElement("BUTTON"));
        deleteButtonCell.append(deleteButton);

        idCell.innerHTML = allProducts[index]["id"];
        nameCell.innerHTML = allProducts[index]["name"];
        brandCell.innerHTML = allProducts[index]["brand"];
        priceCell.innerHTML = allProducts[index]["price"];
        deleteButton.innerHTML = "X";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", function () {
            deleteProduct(idCell.innerHTML);
            window.location.reload();
        });
    });
}

getProducts(generateTableContent);

const formElement = document.querySelector(".add-product-form")
const sumbitButton = document.querySelector(".add-product-button");

formElement.addEventListener("submit", function(event) {

    event.preventDefault()

    const formData = new FormData(formElement);
    newProductName = formData.get('name-input');
    newProductBrand = formData.get('brand-input');
    newProductPrice = formData.get('price-input');

    postProducts( newProductName, newProductBrand, newProductPrice )

    window.location.reload();
    
});

