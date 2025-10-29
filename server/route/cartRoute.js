const express = require("express");
const router = express.Router();
const {getCartIds,getCartProducts,cartProducts,cartItemDelete,cartDelete,cartUpdate} = require('../controller/cartController')

router.get('/ids',getCartIds);
router.get('/',getCartProducts);
router.post('/',cartProducts);
router.put('/:id',cartUpdate);
router.delete('/:productId',cartItemDelete);
router.delete('/',cartDelete);

module.exports= router;