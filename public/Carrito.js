const cloud = document.getElementById("cloud");  
const barraLateral = document.querySelector(".barra-lateral");  
const spans = document.querySelectorAll("span");  
const palanca = document.querySelector(".switch");  
const circulo = document.querySelector(".circulo");  
const menu = document.querySelector(".menu");  
const main = document.querySelector("main");  

menu.addEventListener("click", () => {  
    barraLateral.classList.toggle("max-barra-lateral");  
    if (barraLateral.classList.contains("max-barra-lateral")) {  
        menu.children[0].style.display = "none";  
        menu.children[1].style.display = "block";  
    } else {  
        menu.children[0].style.display = "block";  
        menu.children[1].style.display = "none";  
    }  
    if (window.innerWidth <= 320) {  
        barraLateral.classList.add("mini-barra-lateral");  
        main.classList.add("min-main");  
        spans.forEach((span) => {  
            span.classList.add("oculto");  
        });  
    }  
});  

palanca.addEventListener("click", () => {  
    let body = document.body;  
    body.classList.toggle("dark-mode");  
    body.classList.toggle("");  
    circulo.classList.toggle("prendido");  
});  

cloud.addEventListener("click", () => {  
    barraLateral.classList.toggle("mini-barra-lateral");  
    main.classList.toggle("min-main");  
    spans.forEach((span) => {  
        span.classList.toggle("oculto");  
    });  
});  

const contenedorTarjetasFarmacia = document.getElementById("productos-container");  
const cuentaCarrito = document.getElementById("cuenta-carrito");  
let productos =  [];  

function crearTarjetasFarmacia() {  
    let claves = Object.keys(localStorage)
    claves.forEach((claves)=>{
        productos.push(localStorage.getItem(claves))
    })
        contenedorTarjetasFarmacia.innerHTML = '';  

    if (productos.length > 0) {  
        productos.forEach(farmacia => {  
            const nuevoProducto = document.createElement('div');  
            nuevoProducto.classList.add("card");  
            // console.log(JSON.parse(farmacia))
            farmacia = JSON.parse(farmacia)[0]
            nuevoProducto.innerHTML = `  
                <div class="imgBx">  
                    <img src="/${farmacia.imagen}" alt="${farmacia.nombre}">  
                </div>  
                <div class="content">  
                    <div class="details">  
                        <h2>${farmacia.nombre}</h2>  
                        <p>${farmacia.precio}</p>  
                    </div>  
                    <div class="cantidad">  
                        <button class="boton" onclick="cambiarCantidad(${farmacia.id}, -1)">-</button>  
                        <span>${farmacia.cantidad}</span>  
                        <button class="boton" onclick="cambiarCantidad(${farmacia.id}, 1)">+</button>  
                    </div>  
                
                </div>  
            `;  

            contenedorTarjetasFarmacia.appendChild(nuevoProducto);  
        });  

        actualizarTotal(); // Se asegura que el total se calcule  
    } else {  
        contenedorTarjetasFarmacia.innerHTML = '<p class="vacio">No hay productos en el carrito.</p>';  
        document.getElementById("total").innerText = 'Total: bs. 0.00'; // Asegúrate de mostrar 0 al estar vacío  
    }  

    actualizarCuentaCarrito();  
}  

function cambiarCantidad(id, cambio) {  
    // productos=JSON.parse(productos)
    var productos_nuevos = []
    productos.forEach((producto)=>{
        productos_nuevos.push(JSON.parse(producto)[0])
    })
    const producto = productos_nuevos.find(p => p._id == id);  
    console.log(producto)
    if (producto) {  
        producto.cantidad += cambio;  

        // No permitir cantidades negativas  
        if (producto.cantidad < 0) {  
            producto.cantidad = 0;  
        }  

        // Si la cantidad es 0, eliminar el producto del carrito  
        if (producto.cantidad === 0) {  
            productos = productos.filter(p => p._id !== id);  
        }  

        // Actualizar localStorage  
        // localStorage.setItem("nuevoProducto", JSON.stringify(productos));    

        // Actualizar la visualización  
        crearTarjetasFarmacia(); // Esto actualizará también el total y la cantidad en la barra de navegación  
    }  
}  

function eliminarProducto(id) {  
    // Elimina el producto del array  
    productos = productos.filter(p => p.id !== id);  
    localStorage.setItem("nuevoProducto", JSON.stringify(productos)); // Actualizar localStorage  

    // Refresh the display  
    crearTarjetasFarmacia(); // Esto se encargará de refrescar la vista del carrito  
    actualizarTotal(); // Asegúrate de que se llama para actualizar el total a 0 si no hay productos  
}  

function actualizarTotal() {  
    const total = productos.reduce((acc, producto) => {  
        // console.log(JSON.parse(producto))
        producto = JSON.parse(producto)[0]
        const precio = parseFloat(producto.precio); 
        return acc + (precio * producto.cantidad);  
    }, 0);  

    document.getElementById("total").innerText = `Total: bs. ${total.toFixed(2)}`;  
}  

function actualizarCuentaCarrito() {  
    const cantidadTotal = productos.reduce((acc, producto) => acc + producto.cantidad, 0);  
    cuentaCarrito.innerText = cantidadTotal > 0 ? cantidadTotal : ''; // Muestra la cantidad o vacío si es 0  
}  

// Llamar a la función al cargar el DOM para que se muestre el carrito en la carga de la página  
// document.addEventListener("DOMContentLoaded", );


document.addEventListener('DOMContentLoaded', () => { 
    crearTarjetasFarmacia() 
    const modal = document.getElementById("modalPago");  
    const btnPago = document.getElementById("btn-pago");  
    const cerrarModal = document.getElementById("cerrarModal");  
    const seccionPagoMovil = document.getElementById("seccionPagoMovil");  
    const seccionPaypal = document.getElementById("seccionPaypal");  
    const btnPagoMovil = document.getElementById("btnPagoMovil");  
    const btnPaypal = document.getElementById("btnPaypal");  

    // Abrir la modal al hacer clic en el botón de pagar  
    btnPago.onclick = function() {  
        modal.style.display = "block";  
    };  

    // Cerrar la modal  
    cerrarModal.onclick = function() {  
        modal.style.display = "none";  
        resetModal(); // Resetear el modal al cerrarlo  
    };  

    // Selecciona el pago móvil  
    btnPagoMovil.onclick = function() {  
        seccionPagoMovil.style.display = "block";  
        seccionPaypal.style.display = "none";  
    };  

    // Selecciona el pago con PayPal  
    btnPaypal.onclick = function() {   
        seccionPaypal.style.display = "block";  
        seccionPagoMovil.style.display = "none";  
    };  

    // Manejar el envío del formulario de Pago Móvil  
    const btnConfirmarPagoMovil = document.getElementById("btnConfirmarPagoMovil");  

    btnConfirmarPagoMovil.onclick = function() {  
        const telefono = document.getElementById("telefono").value;  
        const cedula = document.getElementById("cedula").value;  
        const banco = document.getElementById("banco").value;  
        const referencia = document.getElementById("referencia").value;  
        const monto = document.getElementById("monto").value;  

        alert(`Pago Móvil procesado correctamente.\n  
               Teléfono: ${telefono}\n  
               Cédula: ${cedula}\n  
               Banco: ${banco}\n  
               Referencia: ${referencia}\n  
               Monto: ${monto}`);  

        // Cierra la modal y resetea el formulario  
        modal.style.display = "none";  
        resetModal(); // Resetear el modal  
    };  

    // Función para resetear el modal al cerrarlo  
    function resetModal() {  
        seccionPagoMovil.style.display = "none";  
        seccionPaypal.style.display = "none";  
        document.getElementById("telefono").value = '';  
        document.getElementById("cedula").value = '';  
        document.getElementById("banco").value = '';  
        document.getElementById("referencia").value = '';  
        document.getElementById("monto").value = '';  
    }  

    // Cerrar la modal si se hace clic fuera de ella  
    window.onclick = function(event) {  
        if (event.target === modal) {  
            modal.style.display = "none";  
            resetModal(); // Resetear el modal al cerrarlo  
        }  
    };  
});