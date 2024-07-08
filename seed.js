// this file contains initial dummy information or data
const mongoose = require('mongoose');
const Product = require('./models/Product');

let products = [
    {
        name: 'headphones',
        img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww',
        price: 1000,
        desc:'Headphones are available'
    },
    {
        name: 'earbuds',
        img:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D",
        price: 1800,
        desc: 'earbuds are available'
    },
    {
        name: 'laptop',
        img:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=872&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 100000,
        desc: 'Headphones are available'
    }
]
async function seedDB() {
    await Product.insertMany(products);
    console.log("Data seeded");
}
module.exports=seedDB;