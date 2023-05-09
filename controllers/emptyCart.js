const Product = require("../models/Products");
const Cart = require("../models/Cart");


const emptyCart = async (req, res) => {

    await Product.updateMany({inCart: true}, {inCart: false});
}



module.exports = emptyCart;