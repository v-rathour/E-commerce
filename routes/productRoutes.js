const express = require('express');
const Product = require('../models/Product');
const router = express.Router() // mini application/instance routes
const {isLoggedIn,isSeller,isProductDelete} = require('../middleware'); // conditional rendering
const Review = require('../models/Review');

//router provides the instance by which we can send requests

router.get('/products/',isLoggedIn, async (req, res) => {
    let products = await Product.find({});// promise
    res.render('products/index', { products });
})

router.get('/products/new',isLoggedIn, (req, res) => {
    res.render('products/new');
})

// ACTUALLY ADDING IN THE DATABASE
router.post('/products/', isLoggedIn,isSeller,async (req, res) => {
    let { name, img, price, desc,review } = req.body;
    await Product.create({ name, img, price, desc,review ,author:req.user._id});
    res.redirect('/products');
})

// TO SHOW A PARTICULAR PRODUCT
router.get('/products/:id',isLoggedIn, async (req, res) => {
    let { id } = req.params;
    let foundProduct = await Product.findById(id).populate('review');
    res.render('products/show', { foundProduct })

})


// FORM TO EDIT A PARTIICULAR PRODUCT
router.get('/products/:id/edit',isLoggedIn, async (req, res) => {
    let { id } = req.params;
    let foundProduct = await Product.findById(id);
    res.render('products/edit', { foundProduct })
})


// TO ACTUALLY CHANGE IN db
router.patch('/products/:id',isLoggedIn,isProductDelete, async (req, res) => {
    let { id } = req.params;
    let { name, img, price, desc } = req.body;
    await Product.findByIdAndUpdate(id, { name, img, price, desc });
    res.redirect(`/products/${id}`);
})

// DELETE THE EXISTING PRODUCT
router.delete('/products/:id',isLoggedIn,isProductDelete, async (req, res) => {

    let { id } = req.params;
    let product = await Product.findById(id);
    
    for (let idd of product.review) { 
        await Review.findByIdAndDelete(idd);
    }

    await Product.findByIdAndDelete(id);
    res.redirect('/products');  
   
})



module.exports = router;