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
let productos = JSON.parse(localStorage.getItem("nuevoProducto")) || [];  

function crearTarjetasFarmacia() {  
    contenedorTarjetasFarmacia.innerHTML = '';  

    if (productos.length > 0) {  
        productos.forEach(farmacia => {  
            const nuevoProducto = document.createElement('div');  
            nuevoProducto.classList.add("card");  

            nuevoProducto.innerHTML = `  
                <div class="imgBx">  
                    <img src="${farmacia.img}" alt="${farmacia.nombre}">  
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
    const producto = productos.find(p => p.id === id);  
    if (producto) {  
        producto.cantidad += cambio;  

        // No permitir cantidades negativas  
        if (producto.cantidad < 0) {  
            producto.cantidad = 0;  
        }  

        // Si la cantidad es 0, eliminar el producto del carrito  
        if (producto.cantidad === 0) {  
            productos = productos.filter(p => p.id !== id);  
        }  

        // Actualizar localStorage  
        localStorage.setItem("nuevoProducto", JSON.stringify(productos));  

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
        const precio = parseFloat(producto.precio.replace('bs. ', '').replace(',', '.'));  
        return acc + (precio * producto.cantidad);  
    }, 0);  

    document.getElementById("total").innerText = `Total: bs. ${total.toFixed(2)}`;  
}  

function actualizarCuentaCarrito() {  
    const cantidadTotal = productos.reduce((acc, producto) => acc + producto.cantidad, 0);  
    cuentaCarrito.innerText = cantidadTotal > 0 ? cantidadTotal : ''; // Muestra la cantidad o vacío si es 0  
}  

// Llamar a la función al cargar el DOM para que se muestre el carrito en la carga de la página  
document.addEventListener("DOMContentLoaded", crearTarjetasFarmacia);


//ventana modal
document.addEventListener('DOMContentLoaded', () => {  
    const modal = document.getElementById("modalPago");  
    const btnPago = document.getElementById("btn-pago");  
    const cerrarModal = document.getElementById("cerrarModal");  
    const formPago = document.getElementById("formPago");  
    const direccionSection = document.getElementById("direccionSection");  
    const deliveryOption = document.getElementById("delivery");  
    const pickupOption = document.getElementById("pickup");  
    const btnMapa = document.getElementById("btn-mapa");  
    const direccionInput = document.getElementById("direccion");  
    const mapDiv = document.getElementById("map");  

    let map;  
    let marker;  

    // Abrir la modal al hacer clic en el botón de pagar  
    btnPago.onclick = function() {  
        modal.style.display = "block";  
    }  

    // Cerrar la modal  
    cerrarModal.onclick = function() {  
        modal.style.display = "none";  
    }  

    // Mostrar u ocultar la sección de dirección  
deliveryOption.onchange = function() {  
    direccionSection.style.display = "block";  
    initializeMap(); // Inicializa el mapa al seleccionar delivery  
};  

pickupOption.onchange = function() {  
    direccionSection.style.display = "none";  
    if (map) {  
        map.remove(); // Limpia el mapa si está activo  
        mapDiv.innerHTML = ""; // Limpia el contenedor del mapa  
    }  
};  

// Configuración del mapa y marcador  
function initializeMap() {  
    // Mostrar el div del mapa  
    mapDiv.style.display = "block";  

    // Inicializa el mapa  
    map = L.map('map').setView([37.7749, -122.4194], 13); // Cambia las coordenadas a la ubicación deseada  

    // Capa de OpenStreetMap  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {  
        maxZoom: 19,  
    }).addTo(map);  

    // Evento de clic en el mapa  
    map.on('click', function(e) {  
        if (marker) {  
            map.removeLayer(marker); // Remueve el marcador anterior  
        }  
        // Añade un nuevo marcador  
        marker = L.marker(e.latlng).addTo(map);  
        getAddress(e.latlng); // Llama a la función para obtener la dirección  
    });  
}  

// Función para obtener la dirección usando geocodificación  
function getAddress(latlng) {  
    const lat = latlng.lat;  
    const lng = latlng.lng;  

    // Llama a la API de Nominatim para obtener la dirección  
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)  
        .then(response => response.json())  
        .then(data => {  
            if (data && data.display_name) {  
                direccionInput.value = data.display_name; // Obtener la dirección y ponerla en el input  
            } else {  
                direccionInput.value = "Dirección no encontrada";  
            }  
        })  
        .catch(error => {  
            console.error('Error al obtener la dirección:', error);  
            direccionInput.value = "Error al obtener la dirección";  
        });  
}  
    // Cerrar la modal si se hace clic fuera de ella  
    window.onclick = function(event) {  
        if (event.target === modal) {  
            modal.style.display = "none";  
        }  
    }  

    // Manejar el envío del formulario  
    formPago.onsubmit = function(e) {  
        e.preventDefault(); // Evita que la página se recargue  
        const entregaSeleccionada = deliveryOption.checked ? "Delivery" : "Pickup";  
        const direccion = deliveryOption.checked ? direccionInput.value : "";  

        alert(`Pago procesado exitosamente.\n   Opción de entrega: ${entregaSeleccionada}${direccion ? `\nDirección: ${direccion}` : ""}`);  
        modal.style.display = "none"; // Cierra la modal tras el envío  
        formPago.reset(); // Resetea el formulario  
        
        // Limpiar el mapa si estaba abierto  
        if (map) {  
            map.remove();  
            mapDiv.innerHTML = "";  
        }  
    }  
});