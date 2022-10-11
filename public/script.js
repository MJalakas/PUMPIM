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

const products = document.getElementById("products");

function getProducts() {
    fetch('/products', {
        method: 'GET',
    }).then(res => {
        if (res.ok) return res.text();
        return "Failed to fetch products";
    }).then(text => {
        products.innerHTML = text;
    });
};

getProducts()
