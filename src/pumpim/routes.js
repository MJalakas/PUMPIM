const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', async function(req, res, next) {
  try {
    res.json(await controller.getProducts())
  } catch (err) {
    console.error(`Error while getting products `, err.message)
    next(err)
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await controller.addProduct(req.body));
  } catch (err) {
    console.error(`Error while creating product`, err.message)
    next(err)
  }
})

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await controller.deleteProduct(req.params.id));
  } catch (err) {
    console.error(`Error while deleting product`, err.message);
    next(err);
  }
});

router.get("/:id", async function(req, res, next) {
  try {
    res.json(await controller.getProductById(req.params.id));
  } catch (err) {
    console.log(`Error while getting product by id`, err.message);
    next(err);
  }
})


module.exports = router;