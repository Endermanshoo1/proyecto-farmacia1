async function agregarAlCarrito(producto) {  
    try {  
        const response = await fetch('/api/carrito', {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json',  
            },  
            body: JSON.stringify({   
                productoId: producto.id, // Asegúrate que tu backend maneje esto  
                cantidad: 1 // Asumiendo que siempre se agrega 1 al carrito  
            }),  
        });  

        if (!response.ok) {  
            throw new Error('Error al agregar el producto al carrito');  
        }  

        // Actualiza el número del carrito después de agregar  
        actualizarNumeroCarrito();  
    } catch (error) {  
        console.error(error);  
    }  
}  

// Eliminar un producto del carrito  
async function eliminarDelCarrito(productoId) {  
    try {  
        const response = await fetch(`/api/carrito/${productoId}`, {  
            method: 'DELETE',  
        });  

        if (!response.ok) {  
            throw new Error('Error al eliminar el producto del carrito');  
        }  

        // Actualiza el número del carrito después de eliminar  
        actualizarNumeroCarrito();  
    } catch (error) {  
        console.error(error);  
    }  
}  

// Reducir la cantidad de un producto  
async function reducirCantidad(productoId) {  
    try {  
        const response = await fetch(`/api/carrito/${productoId}`, {  
            method: 'PUT',  
            headers: {  
                'Content-Type': 'application/json',  
            },  
            body: JSON.stringify({ cantidad: -1 }), // Reducir cantidad en 1  
        });  

        if (!response.ok) {  
            throw new Error('Error al reducir la cantidad del producto');  
        }  

        // Actualiza el número del carrito después de reducir la cantidad  
        actualizarNumeroCarrito();  
    } catch (error) {  
        console.error(error);  
    }  
}  

// Actualizar el número del carrito desde la base de datos  
async function actualizarNumeroCarrito() {  
    try {  
        const response = await fetch('/api/carrito'); // Obtener todos los items del carrito  
        if (!response.ok) {  
            throw new Error('Error al obtener el carrito');  
        }  

        const carrito = await response.json();  
        const cuentaCarritoElement = document.getElementById("cuenta-carrito");  

        if (cuentaCarritoElement) {  
            const cuenta = carrito.reduce((acum, current) => acum + current.cantidad, 0);  
            cuentaCarritoElement.innerText = cuenta;  
        }  
    } catch (error) {  
        console.error(error);  
    }  
}  

// Asegúrate de que el código se ejecute después de que el DOM esté cargado  
document.addEventListener("DOMContentLoaded", function() {  
    actualizarNumeroCarrito();  
});  