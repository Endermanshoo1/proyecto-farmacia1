const mongoose = require('mongoose');  

const pagoSchema = new mongoose.Schema({  
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },  
    monto: { type: Number, required: true },  
    tipoPago: { type: String, enum: ['pago_movil', 'divisas', 'efectivo_bs', 'efectivo_divisas'], required: true },  
    referencia: { type: String },  
    estado: { type: String, enum: ['pendiente', 'aprobado', 'cancelado', 'rechazado'], default: 'pendiente' },  
    fechaCreacion: { type: Date, default: Date.now }  
});  

module.exports = mongoose.model('Pago', pagoSchema); 