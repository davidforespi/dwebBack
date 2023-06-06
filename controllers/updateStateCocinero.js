const Bill = require('../models/Bill');
const nodemailer = require('nodemailer');

const updateInvoiceStateCocinero = async (req, res) => {
  const { invoiceId } = req.params;
  const { state } = req.body;

  try {
    const invoice = await Bill.findByIdAndUpdate(invoiceId,{ state },{ new: true });

    if (!invoice) {
      return res.status(404).json({ mensaje: 'Factura no encontrada' });
    }

    Bill.findById(invoiceId).then((bill)=>{
    const correo = bill.mail;
    const price = bill.price;
    sendConfirmationEmail(correo, price);
    });
    res.json({ mensaje: 'Estado de factura actualizado', factura: invoice });




  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el estado de la factura' });
  }
};



const sendConfirmationEmail = (correo, price) => {
    // Configurar el transporte de correo
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'godrestaurant13@gmail.com',
          pass: 'deekjduvulgzjink',
        },
    });

    // Configurar el contenido del correo
    
    const mailOptions = {
        from: 'godrestaurant13@gmail.com',
        to: correo,
        subject: 'Pedido en Camino',
        text: `
        Querido Cliente,
        
        Su pedido ya ha sido preparado. En unos momentos llegará a su mesa.
        
        Recuerde que el precio de su pedido es $ ${price} Pesos.
        
        Att,
        
        Rennala Restaurant`,
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};


module.exports = updateInvoiceStateCocinero;
