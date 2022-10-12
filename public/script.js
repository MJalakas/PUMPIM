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

function showProducts() {
    const tableRows = document.querySelectorAll(".product");
    const tableRowsArray = Array.from(tableRows)

    tableRowsArray.forEach(function callback(row, index) {
        const tableCells = row.querySelectorAll("td")
        const nameCell = row.querySelector(".product-name");
        const brandCell = row.querySelector(".brand");
        const priceCell = row.querySelector(".price");
        nameCell.innerHTML = allProducts[index]["name"]
        brandCell.innerHTML = allProducts[index]["brand"]
        priceCell.innerHTML = allProducts[index]["price"]
    });
}
getProducts(showProducts);