const {model, Schema } = require('mongoose');

const BillSchema = new Schema({
    
    user: { type: String, required: true, unique: false},
    username: { type: String, required: true, unique: false},
    price: {type: String, required: true, unique: false},
    state: { type: String, enum: ['En espera', 'Pagado'], default: 'En espera', unique: false},
    date: {type: Date, default: Date.now()},
    
});


module.exports = model('Bill', BillSchema);