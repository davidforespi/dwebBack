const register = require('./register');
const login = require('./login');
const getUserById = require('./getUser');
const getProducts = require("./getProducts");
const getProductsCart = require("./GetProductsCart")
const addProductCart = require("./addProductCart");
const putProduct = require("./putProduct");
const deleteProduct = require("./DeleteProduct")


module.exports = {
    register,
    login,
    getUserById,
    getProducts,
    getProductsCart,
    addProductCart,
    putProduct,
    deleteProduct,
};