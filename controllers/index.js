const register = require('./register');
const login = require('./login');
const getUserById = require('./getUser');
const getProducts = require("./GetProducts");
const getProductsCart = require("./GetProductsCart")
const addProductCart = require("./AddProductCart");
const putProduct = require("./PutProduct");
const deleteProduct = require("./DeleteProduct")
const emptyCart = require("./emptyCart");
const getUserCart = require("./getUserCart");
const recover = require("./recover");
const editprofile = require("./editprofile");
const pay = require('./pay');
const deleteCartUser = require("./deleteCartUser");
const getAdmins = require("./getAdmins");
const loginAdmin = require("./loginAdmin");
const getPayments = require("./getPayments");
const updateInvoiceState = require("./updateInvoiceState");

module.exports = {
    register,
    login,
    getUserById,
    getProducts,
    getProductsCart,
    addProductCart,
    putProduct,
    deleteProduct,
    emptyCart,
    getUserCart,
    recover,
    editprofile,
    pay,
    deleteCartUser,
    getAdmins,
    loginAdmin,
    getPayments,
    updateInvoiceState,
};