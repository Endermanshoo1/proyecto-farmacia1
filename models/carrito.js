const mongoose = require('mongoose');  

const carritoSchema = new mongoose.Schema({  
    productoId: {  
        type: mongoose.Schema.Types.ObjectId, // Referencia a Producto  
        ref: 'Producto',  
        required: true,  
    },  
    cantidad: {  
        type: Number,  
        required: true,  
        default: 1, // Cantidad por defecto en 1  
    },  
}, { timestamps: true });  

const Carrito = mongoose.model('Carrito', carritoSchema);  

module.exports = Carrito;  