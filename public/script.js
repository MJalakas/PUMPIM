fetch('/products', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'Brown sofa',
        brand: 'MASKU',
        price: 600,
    }),
}).then(res => {
    if (res.ok) return res.json()
    return "Failed to update product"
    })
    .then(data => console.log(data))