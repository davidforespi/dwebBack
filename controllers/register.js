const bcrypt = require('bcrypt');
const User = require('../models/user');
const nodemailer = require('nodemailer');

const register = async (req,res) =>{
    const {nombre, correo, contraseña} = req.body;

    User.findOne({correo}).then((user) =>{
        if(user){
            return res.json({message: 'Ya existe usuario con ese correo'})
        }else if(!nombre || !correo || !contraseña){
            return res.json({message: 'Faltan campos'})
        }else{
            bcrypt.hash(contraseña, 10, (error, contraseñaHasheada) => {
                if(error) res.json({ error })
                else{
                    const newUser = new User({
                        nombre,
                        correo,
                        contraseña: contraseñaHasheada,
                    });
                    newUser.save().then(async (user) =>{
                        res.json({message: 'Usuario creado'})
                    })
                    .catch((error) => console.error(error));
                }
            })
        }
    });
}

module.exports = register;
