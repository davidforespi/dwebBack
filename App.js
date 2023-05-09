const express = require("express");
const cors = require("cors");
const db = require("./database/db.js");
const controllers = require("./controllers");

const app = express();

app.use(cors());
app.use(express.json());


/* LOGIN */
app.get('/api/user/:id', controllers.getUserById);
app.post('/api/register', controllers.register);
app.post('/api/login', controllers.login);
/*  */


/* CART */
app.get("/api/products", controllers.getProducts);
app.get("/api/products-cart/", controllers.getProductsCart);
app.get("/api/products-getUserCart/:userId", controllers.getUserCart);	
app.delete("/api/products-emptyCart/", controllers.emptyCart);
app.post("/api/products-addCart/:userId", controllers.addProductCart);
app.put("/api/products-cart/:productId", controllers.putProduct);
app.delete("/api/products-cart/:productId", controllers.deleteProduct);
/* */



const PORT = 5000;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  db();
});

module.exports = app;
