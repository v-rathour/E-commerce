const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router() // mini application/instance routes
router.use(express.urlencoded({ extended: true }));


//router provides the instance by which we can send requests
router.post('/products/:id/review', async (req, res) => {

    let { id } = req.params;
    let { rating, comment } = req.body;
    const pr = await Product.findById(id); 
    const review = await Review.create({ rating, comment });
    pr.review.push(review); // adding review id to pr array//mongodb internally isme se id nikaal kr usse push krdega.
    // await review.save();
    await pr.save();
    res.redirect(`/products/${ id }`)

})
module.exports = router;