const bcrypt = require("bcrypt");
const User = require("../models/user");
const Product = require("../models/Products");
const Cart = require("../models/Cart");

const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  
  User.findOne({ correo }).then((user) => {


      if (!user) {
        return res.json({ mensaje: "Usuario no encontrado" });
      }
    bcrypt.compare(contraseña, user.contraseña).then((esCorrecta) => {
      if (esCorrecta) {
        Product.updateMany({ inCart: true }, { $set: { inCart: false } });
        Cart.deleteMany();
        const { id, nombre } = user;
        const data = {
          id,
          nombre,
        };
        res.json({
          mensaje: "Usuario logeado correctamente",
          user: {
            id,
            nombre,
          },
        });

      } else {
        return res.json({ mensaje: "Contraseña incorrecta" });
      }
    });
  });
};

module.exports = login;