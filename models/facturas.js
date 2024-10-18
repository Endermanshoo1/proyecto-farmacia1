const mongoose = require('mongoose');  

const facturaSchema = new mongoose.Schema({  
    email: { type: String, required: true },  
    monto: { type: Number, required: true },  
    tipoPago: { type: String, enum: ['pago_movil', 'divisas', 'efectivo_bs', 'efectivo_divisas'], required: true },  
    referencia: { type: String },  
    productos: [{  
        nombre: { type: String, required: true },  
        cantidad: { type: Number, required: true },  
        precio: { type: Number, required: true },  
        total: { type: Number, required: true }  
    }],  
    estado: {  
        type: String,  
        enum: ['pendiente', 'aprobado', 'rechazada'],    
        default: 'pendiente'  
    },  
    fechaCreacion: { type: Date, default: Date.now }  
});  

module.exports = mongoose.model('Factura', facturaSchema); 