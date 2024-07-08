const mongoose = require('mongoose');
const Review = require('./Review');
const User = require('./User')

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true  // it is used to remove the extra whitespace from first and last fields
    },
    img: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min:0,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Review',
    }],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
})


let Product = mongoose.model('Product', productSchema);
module.exports= Product;