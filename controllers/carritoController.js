const Carrito = require('../models/carrito');    

// Agregar un producto al carrito  
exports.agregarAlCarrito = async (req, res) => {  
    try {  
        const { productoId, cantidad } = req.body;  

        // Verificar que se haya enviado un productoId  
        if (!productoId) {  
            return res.status(400).json({ message: 'El productoId es requerido.' });  
        }  

        // Crear un nuevo item de carrito  
        const nuevoItem = new Carrito({ productoId, cantidad });  
        await nuevoItem.save();  

        return res.status(201).json(nuevoItem);  
    } catch (error) {  
        console.error(error);  
        return res.status(500).json({ message: 'Error al agregar el producto al carrito.' });  
    }  
};  

// Obtener todos los productos del carrito  
exports.obtenerCarrito = async (req, res) => {  
    try {  
        const items = await Carrito.find().populate('productoId'); // Populate para obtener información del producto  
        return res.status(200).json(items);  
    } catch (error) {  
        console.error(error);  
        return res.status(500).json({ message: 'Error al obtener el carrito.' });  
    }  
};  

// Obtener un producto por ID del carrito  
exports.obtenerItemPorId = async (req, res) => {  
    try {  
        const { id } = req.params;  
        const item = await Carrito.findById(id).populate('productoId');  

        if (!item) {  
            return res.status(404).json({ message: 'Producto no encontrado en el carrito.' });  
        }  

        return res.status(200).json(item);  
    } catch (error) {  
        console.error(error);  
        return res.status(500).json({ message: 'Error al obtener el producto del carrito.' });  
    }  
};  

// Actualizar la cantidad de un producto en el carrito  
exports.actualizarItem = async (req, res) => {  
    try {  
        const { id } = req.params;  
        const { cantidad } = req.body;  

        // Verificar que se haya enviado una cantidad  
        if (typeof cantidad !== 'number') {  
            return res.status(400).json({ message: 'La cantidad debe ser un número.' });  
        }  

        const item = await Carrito.findById(id);  
        if (!item) {  
            return res.status(404).json({ message: 'Producto no encontrado en el carrito.' });  
        }  

        // Actualizar la cantidad  
        item.cantidad += cantidad; // Aumentar o disminuir según el valor pasado  
        if (item.cantidad <= 0) {  
            await item.remove(); // Si la cantidad es 0 o menor, eliminar el item  
            return res.status(200).json({ message: 'Producto eliminado del carrito.' });  
        }  

        await item.save();  
        return res.status(200).json(item);  
    } catch (error) {  
        console.error(error);  
        return res.status(500).json({ message: 'Error al actualizar la cantidad del producto.' });  
    }  
};  

// Eliminar un producto del carrito  
exports.eliminarDelCarrito = async (req, res) => {  
    try {  
        const { id } = req.params;  

        const item = await Carrito.findById(id);  
        if (!item) {  
            return res.status(404).json({ message: 'Producto no encontrado en el carrito.' });  
        }  

        await item.remove();  
        return res.status(200).json({ message: 'Producto eliminado del carrito.' });  
    } catch (error) {  
        console.error(error);  
        return res.status(500).json({ message: 'Error al eliminar el producto del carrito.' });  
    }  
};  