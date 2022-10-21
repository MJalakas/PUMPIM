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

function searchProduct( id, name, brand ) {
    if ( id == null && name == null && brand === null ) {
        return ("ERROR")
    } else {
        const searchResult = getProducts(function() {
            const filteredProducts = allProducts.filter(
                function(allProducts) { 
                    searchBy = allProducts.id.toString();
                    return searchBy.includes(id) == true;
                }
            )
            resetTableContent(filteredProducts);
        });
    }
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
        next(allProducts);
    });
};

function resetTableContent(newJson) {
    var table = document.querySelector(".products-table")
    var allRows = Array.from(document.querySelectorAll("tr"));
    console.log(allRows);
    allRows.forEach( row => {
        if (allRows.indexOf(row) == 0) return;
        row.remove();
    })

    generateTableContent(newJson);
}

function generateTableContent(json) {
    var table = document.querySelector(".products-table")
    var productsResultJson = Array.from(json);
    productsResultJson.forEach(function callback(row, index) {
        const newRow = table.insertRow();

        const idCell = newRow.insertCell();
        const nameCell = newRow.insertCell();
        const brandCell = newRow.insertCell();
        const priceCell = newRow.insertCell();
        const deleteButtonCell = newRow.insertCell();
        const deleteButton = document.body.appendChild(document.createElement("BUTTON"));
        deleteButtonCell.append(deleteButton);

        idCell.innerHTML = json[index]["id"];
        nameCell.innerHTML = json[index]["name"];
        brandCell.innerHTML = json[index]["brand"];
        priceCell.innerHTML = json[index]["price"];
        deleteButton.innerHTML = "X";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", function () {
            deleteProduct(idCell.innerHTML);
            window.location.reload();
        });
        idCell.className = "id-td";
        nameCell.className = "name-td";
        brandCell.className = "brand-td";
        priceCell.className ="price-td";
    });
}

getProducts(generateTableContent);

const addProductFormElement = document.querySelector(".add-product-form")

addProductFormElement.addEventListener("submit", function(event) {

    event.preventDefault()

    const formData = new FormData(addProductFormElement);
    newProductName = formData.get('name-input');
    newProductBrand = formData.get('brand-input');
    newProductPrice = formData.get('price-input');

    postProducts( newProductName, newProductBrand, newProductPrice )

    window.location.reload();
    
});

const searchProductFormElement = document.querySelector(".product-search");

searchProductFormElement.addEventListener("submit", function(event) {

    event.preventDefault()

    const formData = new FormData(searchProductFormElement);
    var searchId = formData.get('search-id-input');
    var searchName = formData.get('search-name-input');
    var searchBrand = formData.get('search-brand-input');

    searchProduct( searchId, searchName, searchBrand );

    //window.location.reload();

});
