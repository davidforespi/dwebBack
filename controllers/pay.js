const User = require('../models/user');
const Bill = require('../models/Bill');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const fs = require('fs');


const Pay = async (req, res) => {
    const { userId } = req.params;
    const { price } = req.body;

    User.findById(userId).then((user) => {
        if (user) {
            const bill = new Bill({
                user: userId,
                username: user.nombre,
                price: price,
            });

            bill.save().then((result) => {



                res.json({ mensaje: 'Factura Creada ' + result.date });


                const doc = new PDFDocument();

                // Encabezado de la factura
                doc.rect(50, 50, 500, 400).stroke(); // Dibuja un rectángulo negro como marco
                doc.lineWidth(2); // Establece el ancho de línea en 2 puntos
                doc.strokeColor('black'); // Establece el color de línea en negro

                doc.fontSize(20).text('Factura', { align: 'center', bold: true});
                doc.moveDown();
                doc.fontSize(16).text(`Factura #: ${userId}`, { bold: true});
                doc.fontSize(16).text(`Nombre del Cliente: ${user.nombre}`, {bold: true});
                doc.fontSize(16).text(`Correo del Cliente: ${user.correo}`, {bold: true});
                doc.fontSize(16).text(`Fecha: ${new Date().toLocaleString()}`, {bold: true});
                doc.moveDown();

                // Total de la factura
                doc.fontSize(16).text(`Total: ${price} $`, { align: 'right', bold:true });
                doc.moveDown();

                doc.fontSize(16).text(`Tu satisfacción es nuestro mayor logro. Esperamos con ansias verte nuevamente en nuestro restaurante, donde la buena comida y el excelente servicio siempre te esperan con los brazos abiertos.`, { align: 'Center' });
                doc.moveDown();

                doc.fontSize(16).text("¡Gracias por elegirnos!", { align: 'center' });


                const filePath = './factura.pdf';
                doc.pipe(fs.createWriteStream(filePath));
                doc.end();

                const transporter = nodemailer.createTransport({
                    // Configuración de transporte de correo
                    // Por ejemplo, puedes utilizar Gmail SMTP
                    service: 'gmail',
                    auth: {
                        user: 'godrestaurant13@gmail.com',
                        pass: 'deekjduvulgzjink',
                    },
                });

                const mailOptions = {
                    from: 'godrestaurant13@gmail.com',
                    to: user.correo,
                    subject: 'Factura',
                    text: 'Adjuntamos la factura en formato PDF de tu compra.',
                    attachments: [
                        {
                            filename: 'factura.pdf',
                            path: filePath,
                        },
                    ],
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Error al enviar el correo:', error);
                    } else {
                        console.log('Correo enviado:', info.response);
                    }

                    // Eliminar el archivo PDF después de enviar el correo
                    fs.unlinkSync(filePath);
                });
            });
        }
    });
};

module.exports = Pay;
