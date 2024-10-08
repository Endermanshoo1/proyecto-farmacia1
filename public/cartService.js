function agregarAlCarrito(producto) {  
    console.log('Agregando al carrito:', producto);  
    
    // Obtener el carrito actual del localStorage  
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];  
    
    // Verificar si el producto ya está en el carrito  
    const index = carrito.findIndex(item => item._id === producto._id);  
    
    if (index !== -1) {  
        // Si el producto ya existe en el carrito, incrementar la cantidad  
        carrito[index].cantidad += 1;  
    } else {  
        // Si el producto no existe en el carrito, agregarlo  
        carrito.push({ ...producto, cantidad: 1 });  
    }  
    
    // Guardar el carrito actualizado en el localStorage  
    localStorage.setItem(producto._id, JSON.stringify(carrito));  
    
    // Actualizar el número de productos en el carrito  
    actualizarNumeroCarrito();  
    
    console.log("Carrito actualizado:", carrito);  
}   

/* Toma un producto, le agrega cantidad 1 y lo devuelve */  
function getNuevoProductoParaMemoria(producto) {  
    const nuevoProducto = { ...producto }; // Crear una copia superficial del objeto  
    nuevoProducto.cantidad = 1; // Inicializa la cantidad en 1  
    return nuevoProducto;  
}  

/** Actualiza el número del carrito en el header */  
function actualizarNumeroCarrito() {  
    
    const elementoNumeroCarrito = document.getElementById('cuenta-carrito');  
    elementoNumeroCarrito.textContent = localStorage.length;  

    // console.log('Número total en el carrito:', totalProductos);  
}  

// Función para eliminar un producto del carrito  
function eliminarDelCarrito(productoId) {  
    const memoria = JSON.parse(localStorage.getItem("nuevoProducto"));  
    if (memoria) {  
        const nuevaMemoria = memoria.filter(producto => producto.id !== productoId);  
        localStorage.setItem("nuevoProducto", JSON.stringify(nuevaMemoria));  
        actualizarNumeroCarrito(); // Actualiza el número del carrito  
    }  
}  

// Función para reducir la cantidad de un producto  
function reducirCantidad(productoId) {  
    const memoria = JSON.parse(localStorage.getItem("nuevoProducto"));  
    if (memoria) {  
        const indiceProducto = memoria.findIndex(producto => producto.id === productoId);  
        if (indiceProducto !== -1) {  
            if (memoria[indiceProducto].cantidad > 1) {  
                memoria[indiceProducto].cantidad--; // Reduce la cantidad  
            } else {  
                // Si la cantidad es 1, elimina el producto  
                memoria.splice(indiceProducto, 1);  
            }  
            localStorage.setItem("nuevoProducto", JSON.stringify(memoria)); // Actualiza el carrito  
            actualizarNumeroCarrito(); // Actualiza el número del carrito  
        }  
    }  
}  

// Asegúrate de que el código se ejecute después de que el DOM esté cargado  
document.addEventListener("DOMContentLoaded", function() {  
    actualizarNumeroCarrito(); // Inicializa el número del carrito al cargar la página  
});  