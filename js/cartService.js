function agregarAlCarrito(producto) {  
    // Reviso si el producto está en el carrito.  
    const memoria = JSON.parse(localStorage.getItem("nuevoProducto"));  
    console.log(memoria);  
    
    if (!memoria) {  
        const nuevoProducto = getNuevoProductoParaMemoria(producto);  
        localStorage.setItem("nuevoProducto", JSON.stringify([nuevoProducto]));  
    } else {  
        const indiceProducto = memoria.findIndex(nuevoProducto => nuevoProducto.id === producto.id);  
        console.log(indiceProducto);  
        const nuevaMemoria = [...memoria]; // Hacer una copia de memoria  

        if (indiceProducto === -1) {  
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto));  
        } else {  
            nuevaMemoria[indiceProducto].cantidad++;  
        }  
        localStorage.setItem("nuevoProducto", JSON.stringify(nuevaMemoria)); // Guardar después de incrementar  
    }  
    actualizarNumeroCarrito();  
}  

/* Toma un producto, le agrega cantidad 1 y lo devuelve */  
function getNuevoProductoParaMemoria(producto) {  
    const nuevoProducto = { ...producto }; // Crear una copia superficial del objeto  
    nuevoProducto.cantidad = 1;  
    return nuevoProducto;  
}  

/** Actualiza el número del carrito del header */  
function actualizarNumeroCarrito() {  
    const cuentaCarritoElement = document.getElementById("cuenta-carrito");  
    if (!cuentaCarritoElement) {  
        console.error("El elemento 'cuenta-carrito' no existe en el DOM.");  
        return; // Evita errores si el elemento no existe  
    }  
    
    let cuenta = 0;  
    const memoria = JSON.parse(localStorage.getItem("nuevoProducto"));  
    if (memoria && memoria.length > 0) {  
        cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);  
        cuentaCarritoElement.innerText = cuenta;  
    } else {  
        cuentaCarritoElement.innerText = 0;  
    }  
}  

// Función para eliminar un producto del carrito  
function eliminarDelCarrito(productoId) {  
    const memoria = JSON.parse(localStorage.getItem("nuevoProducto"));  
    if (memoria) {  
        const nuevaMemoria = memoria.filter(producto => producto.id !== productoId);  
        localStorage.setItem("nuevoProducto", JSON.stringify(nuevaMemoria));  
        actualizarNumeroCarrito(); // Actualizar el número del carrito  
    }  
}  

// Función para reducir la cantidad de un producto  
function reducirCantidad(productoId) {  
    const memoria = JSON.parse(localStorage.getItem("nuevoProducto"));  
    if (memoria) {  
        const indiceProducto = memoria.findIndex(producto => producto.id === productoId);  
        if (indiceProducto !== -1) {  
            if (memoria[indiceProducto].cantidad > 1) {  
                memoria[indiceProducto].cantidad--;  
            } else {  
                // Si la cantidad es 1, eliminar el producto  
                memoria.splice(indiceProducto, 1);  
            }  
            localStorage.setItem("nuevoProducto", JSON.stringify(memoria));  
            actualizarNumeroCarrito(); // Actualizar el número del carrito  
        }  
    }  
}  

// Asegúrate de que el código se ejecute después de que el DOM esté cargado  
document.addEventListener("DOMContentLoaded", function() {  
    actualizarNumeroCarrito();  
});