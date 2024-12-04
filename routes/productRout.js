import express from 'express'
import { addToBuy, addToProduct, cartproduct, deleteProduct, editProduct, productsFind, updateCart } from '../controller/productController.js'
const router=express.Router()

router.get('/products',productsFind)
router.patch('/user/:id',cartproduct)
router.patch('/updatecart/:id',updateCart)
router.patch('/userbuy/:id',addToBuy)
router.delete('/deleteproduct/:id',deleteProduct)
router.post('/addproduct',addToProduct)
router.put('/editproduct/:id',editProduct)

export default router
