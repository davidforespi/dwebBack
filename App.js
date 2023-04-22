const express = require("express");
const cors = require("cors");
const db = require("./database/db.js");
const controllers = require("./controllers");

const app = express();

app.use(cors());
app.use(express.json());

app.get('/user/:id', controllers.getUserById);
app.post('/register', controllers.register);
app.post('/login', controllers.login);

const PORT = 4000;

db();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
