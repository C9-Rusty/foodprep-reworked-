const express = require('express')
const {addToCart,getCart,removeFromCart} = require ('../controllers/cartController')
const cartRouter = express.Router()
const authMiddleware = require('../middleware/auth')

cartRouter.post('/add',authMiddleware,addToCart)
cartRouter.get('/get',authMiddleware,getCart)
cartRouter.delete('/remove',authMiddleware,removeFromCart)

module.exports = cartRouter