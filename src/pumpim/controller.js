const db = require('../../db');

async function getProducts() {
    const rows = await db.query(`SELECT * FROM products`)
    return rows
}

async function getProductById(id) {
    const rows = await db.query(`SELECT * FROM products WHERE id="${id}"`)
    return rows
}

async function addProduct(product) {
    const result = await db.query(`INSERT INTO products (name, brand, price) VALUES ("${product.name}", "${product.brand}", "${product.price}")`)
    let message = 'Error creating product'

    if (result.affectedRows) {
        message = 'Product added'
    }

    return {message}
}

async function deleteProduct(id){
    const result = await db.query(
      `DELETE FROM products WHERE id="${id}"`
    );
  
    let message = 'Error in deleting product';
  
    if (result.affectedRows) {
      message = 'Product deleted successfully';
    }
  
    return {message};
  }

module.exports = {getProducts, addProduct, deleteProduct, getProductById}

