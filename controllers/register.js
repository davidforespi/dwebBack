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
                        
                        // envío de correo electrónico
                        const transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 587,
                            secure: false,
                            auth: {
                                user: 'davidforespi34@gmail.com',
                                pass: 'nvoszbajsqbwegwl'
                            }
                        });

                        const message = {
                            from: 'davidforespi34@gmail.com',
                            to: correo,
                            subject: 'Registro exitoso',
                            text: 'Gracias por registrarte en nuestro sitio'
                        };

                        await transporter.sendMail(message);
                    })
                    .catch((error) => console.error(error));
                }
            })
        }
    });
}

module.exports = register;
