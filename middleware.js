
const Product = require('./models/Product')

const isLoggedIn = (req,res,next)=>{
    
    if(!req.isAuthenticated()){
        req.flash('error', 'You must be logged in First.')
        return res.redirect('/login')
    }
    next()
}

const isSeller = (req,res,next)=>{
    if(!req.user.role || req.user.role != 'seller'){
         req.flash('error',"you don't have the permission to do that")
         return res.redirect('/products')
    }
    next();
}

// const isProductDelete = async (req,res,next)=>{
//     let { id } = req.params;
//     console.log(id);
//     const product = await Product.findById(id).populate('author');
//     console.log(product)
//     if(!product.author.equals(req.user._id)){
//         req.flash('error',"you don't have the permission to do that")
//         return res.redirect('/products')
//     }
//     next();
// }

const isProductDelete = async (req, res, next) => {
  let { id } = req.params;
  const product = await Product.findById(id).populate("author");

  if (!product) {
    req.flash("error", "Product not found");
    return res.redirect("/products");
  }

  if (!product.author) {
    req.flash("error", "Product author not found");
    return res.redirect("/products");
  }

  if (!product.author.equals(req.user._id)) {
    req.flash("error", "You don't have the permission to do that");
    return res.redirect("/products");
  }

  next();
};


module.exports = {
    isLoggedIn,
    isSeller,
    isProductDelete
}