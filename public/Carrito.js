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
const totalElement = document.getElementById("total");  
let productos = [];  

function cargarProductosDesdeLocalStorage() {  
    let claves = Object.keys(localStorage);  
    productos = [];  
    
    claves.forEach((clave) => {  
        const producto = JSON.parse(localStorage.getItem(clave));  
        if (producto) {  
            productos.push(producto[0]);  
        }  
    });  
}  

function crearTarjetasFarmacia() {  
    cargarProductosDesdeLocalStorage();  
    contenedorTarjetasFarmacia.innerHTML = '';  

    if (productos.length > 0) {  
        productos.forEach(farmacia => {  
            const nuevoProducto = document.createElement('div');  
            nuevoProducto.classList.add("card");  
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
                        <button class="boton" onclick="cambiarCantidad('${farmacia._id}', -1)">-</button>  
                        <span>${farmacia.cantidad}</span>  
                        <button class="boton" onclick="cambiarCantidad('${farmacia._id}', 1)">+</button>  
                    </div>  
                </div>  
            `;  

            contenedorTarjetasFarmacia.appendChild(nuevoProducto);  
        });  

        actualizarTotal();  
    } else {  
        contenedorTarjetasFarmacia.innerHTML = '<p class="vacio">No hay productos en el carrito.</p>';  
        totalElement.innerText = 'Total: bs. 0.00';  
    }  
    actualizarCuentaCarrito();  
}  

function cambiarCantidad(id, cambio) {  
    const producto = productos.find(p => p._id === id);  
    if (producto) {  
        producto.cantidad += cambio;  
        if (producto.cantidad < 0) {  
            producto.cantidad = 0;  
        }  
        if (producto.cantidad === 0) {  
            eliminarProducto(id);  
            return;  
        }  
        localStorage.setItem(id, JSON.stringify([producto]));    
        crearTarjetasFarmacia();  
    }  
}  

function eliminarProducto(id) {  
    productos = productos.filter(p => p._id !== id);  
    localStorage.removeItem(id);  
    crearTarjetasFarmacia();  
    actualizarTotal();  
}  

function actualizarTotal() {  
    const total = productos.reduce((acc, producto) => {  
        const precio = parseFloat(producto.precio);   
        return acc + (precio * producto.cantidad);   
    }, 0);  
    totalElement.innerText = `Total: bs. ${total.toFixed(2)}`;   
    return total; // Devuelve el total para usarlo en PayPal  
}  

function actualizarCuentaCarrito() {  
    const cantidadTotal = productos.reduce((acc, producto) => acc + producto.cantidad, 0);  
    cuentaCarrito.innerText = cantidadTotal > 0 ? cantidadTotal : '';  
}  

document.addEventListener('DOMContentLoaded', () => {  
    crearTarjetasFarmacia();   
    const modal = document.getElementById("modalPago");    
    const btnPago = document.getElementById("btn-pago");  
    const cerrarModal = document.getElementById("cerrarModal");  
    const seccionPagoMovil = document.getElementById("seccionPagoMovil");  
    const seccionDivisas = document.getElementById("seccionDivisas");  
    const btnPagoMovil = document.getElementById("btnPagoMovil");  
    const btnDivisas = document.getElementById("btnDivisas");  
    const btnConfirmarPagoMovil = document.getElementById("btnConfirmarPagoMovil");  
    const inputReferencia = document.getElementById("referencia"); 

    // Abrir la modal al hacer clic en el botón de pagar  
    btnPago.onclick = function() {  
        modal.style.display = "block";  
    };  

    // Cerrar la modal  
    cerrarModal.onclick = function() {  
        modal.style.display = "none";  
        resetModal();  
    };  

    btnPagoMovil.onclick = function() {  
        seccionPagoMovil.style.display = "block";  
        seccionDivisas.style.display = "none";  
        mostrarDatosBancarios();  
        mostrarMontoTotal();  
    };  

    btnDivisas.onclick = function() {  
        seccionDivisas.style.display = "block";  
        seccionPagoMovil.style.display = "none";  
        mostrarMontoTotalDivisas(); // Mostrar el monto total en la sección de divisas  
    };  

    // Función para obtener el tipo de cambio  
    async function obtenerTipoCambio() {  
        try {  
            const response = await fetch('https://ve.dolarapi.com/v1/dolares/oficial'); // Cambia esto por la URL de la API real  
            if (!response.ok) throw new Error('Error al obtener el tipo de cambio');  
            const data = await response.json();  
            return data.tipo_cambio; // Asegúrate de que este campo exista en la respuesta  
        } catch (error) {  
            console.error(error);  
            return null;  
        }  
    }  

    async function obtenerTasaCambio() {  
        try {  
            const response = await axios.get('https://ve.dolarapi.com/v1/dolares/oficial');  
            const tasaPromedio = response.data.promedio;  
            document.getElementById("tasaCambio").innerText = `La tasa actual del dólar es: Bs. ${tasaPromedio}`;  
        } catch (error) {  
            console.error(error);  
            document.getElementById("tasaCambio").innerText = 'Hubo un error al obtener la tasa.';  
        }  
    }  

    // Función para obtener el valor de una cookie  
    function getCookie(name) {  
    const value = `; ${document.cookie}`;
    console.log(document.cookie)
    console.log(value)  
    const parts = value.split(`; ${name}=`);  
    console.log(parts)
    if (parts.length === 2) {  
        const cookieValue = parts.pop().split(';').shift();  
        console.log(`Cookie encontrada: ${cookieValue}`);  
        return cookieValue;  
    }  
    console.log(`Cookie no encontrada: ${name}`);   
    return null;   
}  

// Evento para realizar el pago móvil  
document.getElementById("btnConfirmarPagoMovil").onclick = async function() {  
    const telefono = document.getElementById("telefono").value;  
    const cedula = document.getElementById("cedula").value;  
    const banco = document.getElementById("banco").value;  
    const referencia = document.getElementById("referencia").value;  
    const montoText = document.getElementById("mostrarmonto").innerText.replace("Monto a cancelar: bs. ", "");  
    const monto = parseFloat(montoText.replace(',', '.'));  

    // Obtener el correo electrónico del usuario desde la cookie  
    const email = getCookie('userData');  

    if (!email) {  
        alert('No se encontró el correo electrónico en la cookie.');  
        return;  
    }  

    // Verifica que todos los campos esenciales estén presentes  
    if (!monto || isNaN(monto) || !telefono || !cedula || !banco || !referencia) {  
        alert('Faltan datos requeridos.');  
        return;  
    }  

    // Preparar el cuerpo de la solicitud  
    const tipoPago = 'pago_movil';   
    const pagoData = {  
        email,  
        monto,  
        tipoPago,  
        referencia  
    };  

    console.log("Datos del pago a enviar:", pagoData);  

    try {  
        const response = await fetch('/api/pagos', {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json'  
            },  
            body: JSON.stringify(pagoData)  
        });  

        if (!response.ok) {  
            throw new Error('Error al procesar el pago: ' + response.statusText);  
        }  

        const result = await response.json();  
        alert(`Pago Móvil procesado correctamente: ${result.message}`);  

        // Aquí se asume que `modal` y `resetModal` están definidos en tu código  
        modal.style.display = "none";  
        resetModal();  
    } catch (error) {  
        alert('Error: ' + error.message);  
    }  
};  

// Manejar la elección de efectivo en Bolívares  
document.getElementById("btnEfectivoBs").onclick = function() {  
    // Mostrar el div de Efectivo en Bolívares  
    document.getElementById("divEfectivoBs").style.display = "block";  
    document.getElementById("divEfectivoDivisas").style.display = "none";  
    
    // Llamar a la función para actualizar y mostrar el total  
    const total = actualizarTotal(); // Se obtiene el total  
    document.getElementById("total2").innerText = `Total: bs. ${total.toFixed(2)}`;  
};  

// Manejar la elección de efectivo en Bolívares  
document.getElementById("btnEfectivoBs").onclick = function() {  
    // Mostrar el div de Efectivo en Bolívares  
    document.getElementById("divEfectivoBs").style.display = "block";  
    document.getElementById("divEfectivoDivisas").style.display = "none";  
    
    // Llamar a la función para actualizar y mostrar el total  
    const total = actualizarTotal(); // Se obtiene el total  
    document.getElementById("total2").innerText = `Total: bs. ${total.toFixed(2)}`;  
};  

document.getElementById("btnConfirmarBs").onclick = async function() {  
    const montoText = document.getElementById("total2").innerText.replace("Total: bs. ", "");  
    const total = parseFloat(montoText.replace(',', '.')); // Obtener el monto total (Bolívares)  

    // Obtener el correo electrónico del usuario desde la cookie  
    const email = getCookie('userData');  

    if (!email) {  
        alert('No se encontró el correo electrónico en la cookie.');  
        return;  
    }  

    // Verifica que el monto sea válido  
    if (!total || isNaN(total)) {  
        alert('El monto a pagar no es válido.');  
        return;  
    }  

    // Preparar el cuerpo de la solicitud  
    const tipoPago = 'efectivo';   
    const pagoData = {  
        email,  
        monto: total,  
        tipoPago  
    };  

    console.log("Datos del pago a enviar:", pagoData);  

    try {  
        const response = await fetch('/api/pagos', {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json'  
            },  
            body: JSON.stringify(pagoData)  
        });  

        if (!response.ok) {  
            throw new Error('Error al procesar el pago: ' + response.statusText);  
        }  

        const result = await response.json();  
        alert(`Pago en Efectivo procesado correctamente: ${result.message}`);  

        // Aquí se asume que `modal` y `resetModal` están definidos en tu código  
        modal.style.display = "none";  
        resetModal();  
    } catch (error) {  
        alert('Error: ' + error.message);  
    }   
}  

document.getElementById("btnConfirmarBs").onclick = function() {  
    const total = actualizarTotal();   
    enviarPagoEfectivo(total);  
};  

// Manejar la elección de efectivo en Divisas  
document.getElementById("btnEfectivoDivisas").onclick = async function() {  
    document.getElementById("divEfectivoDivisas").style.display = "block";  
    document.getElementById("divEfectivoBs").style.display = "none";  

    // Obtener y mostrar la tasa de cambio  
    await obtenerTasaCambio();  

    const tipoCambio = await obtenerTipoCambio();  
    if (tipoCambio) {  
        const montoText = document.getElementById("mostrarmonto").innerText.replace("Monto a cancelar: bs. ", "");  
        const montoBolivares = parseFloat(montoText.replace(',', '.'));  
        if (!isNaN(montoBolivares)) {   
            const montoDivisas = (montoBolivares / tipoCambio).toFixed(2);  
            document.getElementById("mostrarmontoDivisas").innerHTML = `<p>Monto a cancelar en divisas: $${montoDivisas}</p>`;  
        } else {  
            alert('El monto en Bolívares no es válido.');  
        }  
    } else {  
        alert('No se pudo obtener el tipo de cambio.');  
    }  
};  

// Función para mostrar el monto total en divisas  
async function mostrarMontoTotalDivisas() {  
    const mostrarmontoDivisas = document.getElementById("mostrarmontoDivisas");  
    const montoText = document.getElementById("mostrarmonto").innerText.replace("Monto a cancelar: bs. ", "");  
    const montoBolivares = parseFloat(montoText.replace(',', '.'));  
    
    const tipoCambio = await obtenerTipoCambio(); // Consigue el tipo de cambio  
    if (tipoCambio && !isNaN(montoBolivares)) {  
        const montoDivisas = (montoBolivares / tipoCambio).toFixed(2);  
        mostrarmontoDivisas.innerHTML = `<p>Monto a cancelar en divisas: $${montoDivisas}</p>`;  
    } else {  
        mostrarmontoDivisas.innerHTML = `<p>No se pudo calcular el monto en divisas.</p>`;  
    }  
}  

// Actualiza el monto total al momento de mostrar la sección de divisas  
document.getElementById("btnEfectivoDivisas").onclick = async function() {  
    document.getElementById("divEfectivoDivisas").style.display = "block";  
    document.getElementById("divEfectivoBs").style.display = "none";  

    // Obtener y mostrar la tasa de cambio  
    await obtenerTasaCambio();  
    await mostrarMontoTotalDivisas();  
};  

document.getElementById("btnConfirmarBs").onclick = function() {  
    const total = actualizarTotal();  
    alert(`Pago en Efectivo (Bolívares) procesado correctamente.\nTotal: bs. ${total.toFixed(2)}`);  
    modal.style.display = "none";  
    resetModal();  
};    

document.getElementById("btnConfirmarDivisas").onclick = function() {  
    const montoDivisas = document.getElementById("montoDivisas").value;  

    if (!montoDivisas) {  
        alert("Por favor, ingrese un monto en divisas.");  
        return;  
    }  

    alert(`Pago en Efectivo (Divisas) procesado correctamente.\nMonto en divisas: $${montoDivisas}`);  
    modal.style.display = "none";  
    resetModal();  
};  

function mostrarDatosBancarios() {  
    document.getElementById("telefono").value = "0414-2558608";  
    document.getElementById("cedula").value = "V-29661874";  
    document.getElementById("banco").value = "Banesco";  
}  

function mostrarMontoTotal() {  
    let total = 0;  
    if (typeof actualizarTotal === 'function') {  
        total = actualizarTotal();  
    }  
    const mostrarmonto = document.getElementById("mostrarmonto");  
    mostrarmonto.innerHTML = `<p>Monto a cancelar: bs. ${total.toFixed(2)}</p>`;  
}  

function resetModal() {  
    document.getElementById("seccionPagoMovil").style.display = "none";  
    document.getElementById("seccionDivisas").style.display = "none";  
    document.getElementById("telefono").value = '';  
    document.getElementById("cedula").value = '';  
    document.getElementById("banco").value = '';  
    document.getElementById("referencia").value = '';  
    document.getElementById("montoDivisas").value = '';  
    document.getElementById("mostrarmonto").innerHTML = '';  
    document.getElementById("mostrarmontoDivisas").innerHTML = '';  
}  

window.onclick = function(event) {  
    if (event.target === modal) {  
        modal.style.display = "none";  
        resetModal();  
    }  
}; 
});