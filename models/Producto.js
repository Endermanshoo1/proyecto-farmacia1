const mongoose = require('mongoose');  

const productoSchema = new mongoose.Schema({  
    nombre: {  
        type: String,  
        required: true  
    },  
    precio: {  
        type: Number,  
        required: true  
    },   
    imagen: {  
        type: String,  
        required: true  
    },  
    categoria: {  
        type: String,  
        required: true  
    },  
    stock: {  
        type: Number,  
        required: true,  
        default: 0   
    }  
});  

const Producto = mongoose.model('Producto', productoSchema);  

module.exports = Producto; 