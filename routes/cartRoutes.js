const express = require('express');
const routes = express.Router();
const {isLoggedIn} = require('../middleware'); // conditional rendering

const Product = require('../models/Product');
const User = require('../models/User');
const { route } = require('./productRoutes');

routes.get('/user/cart',isLoggedIn,async (req,res)=>{
    const user = await User.findById(req.user._id).populate('cart');
    res.render('cart/cart',{user});
})

routes.post('/user/:productId/add',isLoggedIn,async (req,res)=>{
    let {productId} = req.params;
    let userid = req.user._id;
    let product = await Product.findById(productId);
    let user = await User.findById(userid);
    user.cart.push(product);
    user.save()
    res.redirect('/user/cart')
})

routes.delete('/user/:cartId', async(req,res)=>{
    const userId = req.user._id;
    const {cartId} = req.params;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
         // Use $pull to remove the specified cartId from the cart array
        user.cart.pull(cartId);
        // Save the updated user object
        await user.save();

        res.redirect('/user/cart')
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: 'Internal Server Error' });
        res.redirect('/user/cart')
  }

})

module.exports = routes;