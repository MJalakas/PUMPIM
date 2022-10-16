const { Router } = require('express');
const controller = require('./controller')

const router = Router();

router.get("/", controller.getProducts);
router.post("/", controller.addProduct);
router.delete("/:id", controller.deleteProduct);
router.get("/:id", controller.getProductById);


module.exports = router;