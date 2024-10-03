const Producto = require('../models/Producto');  

// Crear un nuevo producto   
exports.crearProducto = async (req, res) => {  
    const { nombre, precio, categoria, stock } = req.body; // Ahora incluye stock  
    const imagen = req.file;   

    try {  
        if (!imagen) {  
            return res.status(400).json({ mensaje: 'Se requiere una imagen' });  
        }   

        const nuevoProducto = new Producto({   
            nombre,   
            precio,   
            categoria,   
            imagen: imagen.path,   
            stock  
        });  
        await nuevoProducto.save();  
        res.status(201).json(nuevoProducto);  
    } catch (error) {  
        console.error('Error al crear el producto:', error);  
        res.status(500).json({ mensaje: 'Error al crear el producto', error });  
    }  
};  

// Obtener todos los productos  
exports.obtenerProductos = async (req, res) => {  
    try {  
        const productos = await Producto.find();  
        res.status(200).json(productos);  
    } catch (error) {  
        console.error('Error al obtener los productos:', error);  
        res.status(500).json({ mensaje: 'Error al obtener los productos', error });  
    }  
};  

// Obtener un producto por su ID  
exports.obtenerProductoPorId = async (req, res) => {  
    const { id } = req.params;  
    try {  
        const producto = await Producto.findById(id);  
        if (!producto) {  
            return res.status(404).json({ mensaje: 'Producto no encontrado' });  
        }  
        res.status(200).json(producto);  
    } catch (error) {  
        console.error('Error al obtener el producto:', error);  
        res.status(500).json({ mensaje: 'Error al obtener el producto', error });  
    }  
};  

// Actualizar un producto  
exports.actualizarProducto = async (req, res) => {  
    const { id } = req.params;  
    const { nombre, precio, categoria, imagen, stock } = req.body;  

    // Preparar el objeto de actualización  
    const actualizarDatos = {};  
    if (nombre) actualizarDatos.nombre = nombre;  
    if (precio) actualizarDatos.precio = precio;  
    if (categoria) actualizarDatos.categoria = categoria;  
    if (imagen) actualizarDatos.imagen = imagen;  
    if (stock !== undefined) actualizarDatos.stock = stock; // Permitir que el stock sea 0  

    try {  
        const productoActualizado = await Producto.findByIdAndUpdate(id, actualizarDatos, { new: true });  
        if (!productoActualizado) {  
            return res.status(404).json({ mensaje: 'Producto no encontrado' });  
        }  
        res.status(200).json(productoActualizado);  
    } catch (error) {  
        console.error('Error al actualizar el producto:', error);  
        res.status(500).json({ mensaje: 'Error al actualizar el producto', error });  
    }  
};  

// Eliminar un producto  
exports.eliminarProducto = async (req, res) => {  
    const { id } = req.params;  
    try {  
        const productoEliminado = await Producto.findByIdAndDelete(id); // Cambiado a findByIdAndDelete  
        if (!productoEliminado) {  
            return res.status(404).json({ mensaje: 'Producto no encontrado' });  
        }  
        res.status(200).json({ mensaje: 'Producto eliminado exitosamente' });  
    } catch (error) {  
        console.error('Error al eliminar el producto:', error);  
        res.status(500).json({ mensaje: 'Error al eliminar el producto', error });  
    }  
};  

// Obtener productos por categoría  
exports.obtenerProductosPorCategoria = async (req, res) => {  
    const { categoria } = req.params; // Obteniendo la categoría desde los parámetros de la ruta  

    try {  
        const productosPorCategoria = await Producto.find({ categoria }); // Buscando productos por categoría  
        if (!productosPorCategoria.length) {  
            return res.status(404).json({ mensaje: 'No se encontraron productos en esta categoría' });  
        }  
        res.status(200).json(productosPorCategoria); // Retornando los productos encontrados  
    } catch (error) {  
        console.error('Error al obtener productos por categoría:', error);  
        res.status(500).json({ mensaje: 'Error al obtener productos por categoría', error });  
    }  
};  