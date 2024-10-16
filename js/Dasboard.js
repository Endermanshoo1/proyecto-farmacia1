
const cloud = document.getElementById("cloud");
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulo");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");

menu.addEventListener("click",()=>{
    barraLateral.classList.toggle("max-barra-lateral");
    if(barraLateral.classList.contains("max-barra-lateral")){
        menu.children[0].style.display = "none";
        menu.children[1].style.display = "block";
    }
    else{
        menu.children[0].style.display = "block";
        menu.children[1].style.display = "none";
    }
    if(window.innerWidth<=320){
        barraLateral.classList.add("mini-barra-lateral");
        main.classList.add("min-main");
        spans.forEach((span)=>{
            span.classList.add("oculto");
        })
    }
});

document.addEventListener("DOMContentLoaded", () => {  
    document.getElementById("cerrarsesion").addEventListener("click", async () => {  
        try {  
            // Hacer una solicitud a la ruta de logout en el servidor  
            const response = await fetch('/api/logout', {  
                method: 'POST', 
                credentials: 'include' 
            });  

            if (response.ok) {  
                // Redirigir al usuario a la página principal o a la página de inicio de sesión  
                document.location.href = "/";  
            } else {  
                console.error('Error al cerrar sesión');  
            }  
        } catch (error) {  
            console.error('Error en la solicitud:', error);  
        }  
    });  
});

palanca.addEventListener("click",()=>{
    let body = document.body;
    body.classList.toggle("dark-mode");
    body.classList.toggle("");
    circulo.classList.toggle("prendido");
});

cloud.addEventListener("click",()=>{
    barraLateral.classList.toggle("mini-barra-lateral");
    main.classList.toggle("min-main");
    spans.forEach((span)=>{
        span.classList.toggle("oculto");
    });
});

//baner

const slider = document.getElementById('slider');  
            const totalSlides = slider.children.length;  
            let currentIndex = 0;  

            function showSlide(index) {  
                if (index < 0) {  
                    currentIndex = totalSlides - 1;  
                } else if (index >= totalSlides) {  
                    currentIndex = 0;  
                } else {  
                    currentIndex = index;  
                }  
                slider.style.transform = `translateX(-${currentIndex * 100}%)`;  
            }  

            document.getElementById('prev').addEventListener('click', () => {  
                showSlide(currentIndex - 1);  
            });  

            document.getElementById('next').addEventListener('click', () => {  
                showSlide(currentIndex + 1);  
            });  

            setInterval(() => {  
                showSlide(currentIndex + 1);  
            }, 4000);  

//scroller cartas
let currentSlide = 0;  
const visibleCards = 26; // Número de tarjetas visibles  

function moveSlide(direction) {  
    const slides = document.querySelectorAll('.card');  
    const totalSlides = slides.length; // Número total de tarjetas  

    // Ajustar el valor de currentSlide para que se mueva correctamente  
    currentSlide += direction;  

    // Si se intenta mover más allá de la última tarjeta, reiniciar a la primera  
    if (currentSlide < 0) {  
        currentSlide = 0; // No permitir que se mueva antes de la primera diapositiva  
    } else if (currentSlide > totalSlides - visibleCards) {  
        currentSlide = 0; // Reiniciar a la primera tarjeta  
    }  

    // Calcular el desplazamiento en función de currentSlide y visibleCards  
    const offset = -currentSlide * (130 / visibleCards); // Mover el carrusel  
    document.querySelector('.carousel-cards').style.transform = `translateX(${offset}%)`;  
} 

//scroller productos  
 
const scrollers = document.querySelectorAll(".scroller");
addAnimation();

function addAnimation() {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);
  
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
}


//cartas
document.addEventListener('DOMContentLoaded', async () => {  
    await obtenerProductosPorCategoria('ofertasdelmes', 'cartas-frex');   
    await obtenerProductosPorCategoria('farmacia', 'cartas-frex2');    
    await obtenerProductosPorCategoria('belleza', 'cartas-frex3');  
    await obtenerProductosPorCategoria('comestibles', 'cartas-frex4');  
    await obtenerProductosPorCategoria('bebes', 'cartas-frex5');   
    await obtenerProductosPorCategoria('cuidadopersonal', 'cartas-frex6');   
    await obtenerProductosPorCategoria('hogar', 'cartas-frex7');          
});  

async function obtenerProductosPorCategoria(categoria, contenedorId) {  
    const contenedor = document.getElementById(contenedorId);  
    try {  
        const response = await fetch(`/api/productos/categoria/${categoria}`);   
        if (!response.ok) {  
            throw new Error(`Error en la respuesta: ${response.status} - ${response.statusText}`);  
        }  
        const productos = await response.json();  
        console.log(`Productos de ${categoria}:`, productos); // Ver los productos  

        // Limitar solo a los primeros 5 productos  
        const productosLimitados = productos.slice(0, 5);  
        
        crearTarjetasProductos(productosLimitados, contenedor);  
    } catch (error) {  
        console.error(`Error al obtener productos de la categoría ${categoria}:`, error);  
        contenedor.innerHTML = '<p>Error al cargar los productos de esta categoría.</p>';  
    }  
}  

function crearTarjetasProductos(productos, contenedor) {  
    contenedor.innerHTML = ''; // Limpiar contenido previo  

    productos.forEach(producto => {  
        const nuevoProducto = document.createElement('div');  
        nuevoProducto.classList = "card";  
        nuevoProducto.innerHTML = `  
            <div class="imgBx">  
                <img src="${producto.imagen}" alt="${producto.nombre}">  
            </div>  
            <div class="content">  
                <div class="details">  
                    <h2 class="details">${producto.nombre}</h2>  
                    <p class="details">Bs.${producto.precio}</p>   
                </div>  
                <div class="botones">   
                    <button class="carrito"><i class="bx bxs-cart-add"></i> Agregar al carrito</button>  
                </div>  
            </div>  
        `;  
        contenedor.appendChild(nuevoProducto);  

        // Agregar listener al botón de carrito  
        nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", () => {  
            console.log(`Botón clickeado para ${producto.nombre}`); // Diagnóstico  
            agregarAlCarrito(producto);  
        });  
    });  
}  

const contenedorTarjetasFarmacia = document.getElementById("cartas-frex2");  

function crearTarjetasfarmacia(farmacia) {    
    // Limitar a las primeras 5 cartas  
    const primerosCinco = farmacia;  
    console.log(primerosCinco); // Verificar los elementos seleccionados  
    
    primerosCinco.forEach(item => {  
        const nuevoProducto2 = document.createElement('div');  
        nuevoProducto2.classList = "card";  
        nuevoProducto2.innerHTML = `  
        <div class="imgBx">  
            <img src="${item.img}">  
        </div>  
        <div class="content">  
            <div class="details">  
                <h2 class="details">${item.nombre}</h2>  
                <p class="details">Bs.${item.precio}</p>  
            </div>  
            <div class="botones">    
                <button class="carrito"><i class="bx bxs-cart-add"></i></button>  
            </div>  
        </div>  
        `;  
        contenedorTarjetasFarmacia.appendChild(nuevoProducto2);  
        nuevoProducto2.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(item));  
    });  
}   

// Llamar a la función  
crearTarjetasfarmacia(farmacia);  

// Cartas belleza  
const contenedorTarjetasBelleza = document.getElementById("cartas-frex3");  

function crearTarjetasBelleza(belleza) {  
    belleza.slice(0, 5).forEach(belleza => {  
        const nuevoProducto3 = document.createElement('div');  
        nuevoProducto3.classList = "card";  
        nuevoProducto3.innerHTML = `  
        <div class="imgBx">  
            <img src="${belleza.img}">  
        </div>  
        <div class="content">  
            <div class="details">  
                <h2 class="details">${belleza.nombre}</h2>  
                <p class="details">Bs.${belleza.precio}</p>  
            </div>  
            <div class="botones">   
                <button class="carrito"><i class="bx bxs-cart-add"></i></button>  
            </div>  
        </div>  
        `;  
        contenedorTarjetasBelleza.appendChild(nuevoProducto3);  
        nuevoProducto3.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(belleza));  
    });  
}  

crearTarjetasBelleza(belleza);  

// Cartas comestibles  
const contenedorTarjetasComestibles = document.getElementById("cartas-frex4");  

function crearTarjetaComestible(comestibles) {  
    comestibles.slice(0, 5).forEach(comestibles => {  
        const nuevoProducto4 = document.createElement('div');  
        nuevoProducto4.classList = "card";  
        nuevoProducto4.innerHTML = `  
        <div class="imgBx">  
            <img src="${comestibles.img}">  
        </div>  
        <div class="content">  
            <div class="details">  
                <h2 class="details">${comestibles.nombre}</h2>  
                <p class="details">Bs.${comestibles.precio}</p>  
            </div>  
            <div class="botones">    
                <button class="carrito"><i class="bx bxs-cart-add"></i></button>  
            </div>  
        </div>  
        `;  
        contenedorTarjetasComestibles.appendChild(nuevoProducto4);  
        nuevoProducto4.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(comestibles));  
    });  
}  

crearTarjetaComestible(comestibles);  

// Cartas Bebes  
const contenedorTarjetasBebes = document.getElementById("cartas-frex5");  

function crearTarjetaBebes(bebes) {  
    bebes.slice(0, 5).forEach(bebes => {  
        const nuevoProducto5 = document.createElement('div');  
        nuevoProducto5.classList = "card";  
        nuevoProducto5.innerHTML = `  
        <div class="imgBx">  
            <img src="${bebes.img}">  
        </div>  
        <div class="content">  
            <div class="details">  
                <h2 class="details">${bebes.nombre}</h2>  
                <p class="details">Bs.${bebes.precio}</p>  
            </div>  
            <div class="botones">  
                <button class="carrito"><i class="bx bxs-cart-add"></i></button>  
            </div>  
        </div>  
        `;  
        contenedorTarjetasBebes.appendChild(nuevoProducto5);  
        nuevoProducto5.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(bebes));  
    });  
}  

crearTarjetaBebes(bebes);  

// Cartas cuidado personal  
const contenedorTarjetasCuidadoPersonal = document.getElementById("cartas-frex6");  

function crearTarjetaCuidadoPersonal(cuidadopersonal) {  
    cuidadopersonal.slice(0, 5).forEach(cuidadopersonal => {  
        const nuevoProducto6 = document.createElement('div');  
        nuevoProducto6.classList = "card";  
        nuevoProducto6.innerHTML = `  
        <div class="imgBx">  
            <img src="${cuidadopersonal.img}">  
        </div>  
        <div class="content">  
            <div class="details">  
                <h2 class="details">${cuidadopersonal.nombre}</h2>  
                <p class="details">Bs.${cuidadopersonal.precio}</p>  
            </div>  
            <div class="botones">    
                <button class="carrito"><i class="bx bxs-cart-add"></i></button>  
            </div>  
        </div>  
        `;  
        contenedorTarjetasCuidadoPersonal.appendChild(nuevoProducto6);  
        nuevoProducto6.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(cuidadopersonal));  
    });  
}  

crearTarjetaCuidadoPersonal(cuidadopersonal);  

// Cartas hogar  
const contenedorTarjetasHogar = document.getElementById("cartas-frex7");  

function crearTarjetaHogar(hogar) {  
    hogar.slice(0, 5).forEach(hogar => {  
        const nuevoProducto = document.createElement('div');  
        nuevoProducto.classList = "card";  
        nuevoProducto.innerHTML = `  
        <div class="imgBx">  
            <img src="${hogar.img}">  
        </div>  
        <div class="content">  
            <div class="details">  
                <h2 class="details">${hogar.nombre}</h2>  
                <p class="details">Bs.${hogar.precio}</p>   
            </div>  
            <div class="botones">   
                <button class="carrito"><i class="bx bxs-cart-add"></i></button>  
            </div>  
        </div>  
        `;  
        contenedorTarjetasHogar.appendChild(nuevoProducto);  
        nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(hogar));  
    });  
}  
  
crearTarjetaHogar(hogar); 


function openModal() {  
            const userDataCookie = getCookie('userData');  
            const userData = JSON.parse(userDataCookie);   

            // Mostrar datos del usuario  
            document.getElementById('username').value = userData.user;  
            document.getElementById('useremail').value = userData.email;  

            // Llamamos a la API para obtener las facturas usando el email del usuario  
            fetch(`/api/facturas/email?email=${encodeURIComponent(userData.email)}`)  
                .then(response => response.json())  
                .then(data => {  
                    const paymentsContainer = document.getElementById('paymentsContainer');  
                    paymentsContainer.innerHTML = ''; // Limpiar el contenedor  
                    
                    if (data && data.length > 0) {  
                        data.forEach(factura => {  
                            const card = document.createElement('div');  
                            card.classList.add('payment-card');    
                            card.classList.add(factura.estado);  

                            // Formatear la fecha  
                            const fecha = new Date(factura.fechaCreacion);   
                            
                            // Opciones de formato  
                            const options = { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', hour12: false };  
                            const fechaFormateada = fecha.toLocaleString('es-ES', options);  

                            // Agregar contenido a la carta  
                            card.innerHTML = `  
                                <h4>Factura</h4>   
                                <p><strong>Fecha de emisión:</strong> ${fechaFormateada}</p>  
                                <p><strong>Monto:</strong> Bs. ${factura.monto}</p>  
                                <p><strong>Estado:</strong> ${factura.estado.charAt(0).toUpperCase() + factura.estado.slice(1)}</p>  
                                <button id="generatePDFButton" onclick="generatePDF()">Generar Factura</button>   
                            `;  

                            paymentsContainer.appendChild(card); // Agregar la carta al contenedor  
                        });  
                    } else {     
                        paymentsContainer.innerHTML = '<div>No se encontraron facturas.</div>';  
                    }   
                })  
                .catch(error => {  
                    console.error('Error al obtener las facturas:', error);  
                    const paymentsContainer = document.getElementById('paymentsContainer');  
                    paymentsContainer.innerHTML = '<div>Error al obtener las facturas.</div>';  
                });  

            document.getElementById('modal').style.display = 'block';  
        }  

        function closeModal() {  
            document.getElementById('modal').style.display = 'none';  
        }  

        function getCookie(name) {  
            let cookieArr = document.cookie.split(";");  
            for(let i = 0; i < cookieArr.length; i++) {  
                let cookiePair = cookieArr[i].split("=");  
                if(name === cookiePair[0].trim()) {  
                    return decodeURIComponent(cookiePair[1]);  
                }  
            }  
            return null;  
        }  

        window.onclick = function(event) {  
            if (event.target === document.getElementById('modal')) {  
                closeModal();  
            }  

        
        }  
        function generatePDF() {  
            const userDataCookie = getCookie('userData');  
            const userData = JSON.parse(userDataCookie);  
        
            if (!userData || !userData.email) {  
                alert('No se pudo obtener la información del usuario.');  
                return;  
            }  
        
            fetch(`/api/facturas/email?email=${encodeURIComponent(userData.email)}`)  
                .then(response => response.json())  
                .then(data => {  
                    if (data && data.length > 0) {  
                        const { jsPDF } = window.jspdf;  
                        const doc = new jsPDF();  
        
                        // Encabezados  
                        doc.setFontSize(20);  
                        doc.text('Factura', 105, 20, { align: 'center' });  
        
                        // Información en cuadro  
                        const infoBoxY = 30; // Posición Y para el cuadro  
                        const boxWidth = 190; // Ancho del cuadro  
                        const boxHeight = 80; // Altura del cuadro ajustada  
        
                        // Dibuja el cuadro de fondo gris  
                        doc.setFillColor(230, 230, 230); // Color gris claro  
                        doc.rect(10, infoBoxY, boxWidth, boxHeight, 'F'); // Dibuja el relleno  
        
                        // Establece el color gris oscuro para el texto  
                        doc.setTextColor(80, 80, 80); // Color de texto gris oscuro  
                        doc.setFontSize(12);  
        
                        const infoTextY = infoBoxY + 10;  
                        const lineHeight = 8; // Altura de línea ajustada para separación  
                        doc.text(`Fecha de emisión: ${new Date(data[0].fechaCreacion).toLocaleDateString('es-ES')}`, 15, infoTextY);  
                        doc.line(10, infoTextY + lineHeight, 200, infoTextY + lineHeight); // Línea de separación  
                        doc.text(`Email: ${data[0].email}`, 15, infoTextY + lineHeight * 2 + 2);  
                        doc.line(10, infoTextY + lineHeight * 3 + 2, 200, infoTextY + lineHeight * 3 + 2);  
                        doc.text(`Tipo de Pago: ${data[0].tipoPago}`, 15, infoTextY + lineHeight * 4 + 2);  
                        doc.line(10, infoTextY + lineHeight * 5 + 2, 200, infoTextY + lineHeight * 5 + 2);  
                        doc.text(`Referencia: ${data[0].referencia}`, 15, infoTextY + lineHeight * 6 + 2);  
                        doc.line(10, infoTextY + lineHeight * 7 + 2, 200, infoTextY + lineHeight * 7 + 2);  
                        doc.text(`Estado: ${data[0].estado.charAt(0).toUpperCase() + data[0].estado.slice(1)}`, 15, infoTextY + lineHeight * 8 + 2);  
        
                        // Espacio antes de los detalles del producto (20 px de margen)  
                        const verticalOffset = infoBoxY + boxHeight + 20; // Posición Y con margen  
                        doc.setFontSize(14);  
                        doc.text('Detalles de los Productos', 10, verticalOffset);  
                        const productDetailsY = verticalOffset + 10; // Posición Y para la tabla  
        
                        // Dibuja la tabla  
                        const tableStartY = productDetailsY;  
                        const tableWidth = 190;  
                        const cellHeight = 10;  
        
                        // Encabezado de la tabla  
                        doc.setFillColor(230, 230, 230); // Fondo gris claro  
                        doc.rect(10, tableStartY, tableWidth, cellHeight, 'F'); // Dibuja el fondo  
        
                        // Títulos de la tabla  
                        doc.setTextColor(80, 80, 80);  
                        doc.text('Producto', 15, tableStartY + 7);  
                        doc.text('Cantidad', 100, tableStartY + 7); // Ajustado para más espacio  
                        doc.text('Precio', 150, tableStartY + 7); // Ajustado para más espacio  
        
                        // Dibuja las líneas divisorias del encabezado  
                        doc.setDrawColor(80, 80, 80); // Color de las líneas  
                        doc.line(10, tableStartY + cellHeight, 200, tableStartY + cellHeight); // Línea inferior  
        
                        let productRowOffset = tableStartY + cellHeight;  
        
                        // Detalles de cada producto  
                        doc.setTextColor(80, 80, 80); // Color de texto gris oscuro  
                        data[0].productos.forEach(producto => {  
                            // Dibuja el fondo de cada fila  
                            doc.setFillColor(255, 255, 255); // Fondo blanco  
                            doc.rect(10, productRowOffset, tableWidth, cellHeight, 'F'); // Dibuja el fondo de la fila  
        
                            // Dibuja el contenido  
                            doc.text(producto.nombre, 15, productRowOffset + 7);  
                            doc.text(`${producto.cantidad}`, 100, productRowOffset + 7); // Espacio aumentado entre el nombre del producto y la cantidad  
                            doc.text(`Bs. ${producto.precio}`, 150, productRowOffset + 7);  
        
                            // Dibuja las líneas divisorias de la fila  
                            doc.setDrawColor(80, 80, 80); // Color de las líneas  
                            doc.line(10, productRowOffset, 200, productRowOffset); // Línea superior  
                            productRowOffset += cellHeight;  
                        });  
        
                        // Línea divisoria después de todas las filas  
                        doc.line(10, productRowOffset, 200, productRowOffset);  
        
                        // Resumen del total  
                        productRowOffset += 10; // Espacio adicional  
                        const total = data[0].monto;  
                        doc.setFontSize(14);  
                        doc.setTextColor(0, 0, 0); // Texto en negro para el total  
                        doc.text(`Total: Bs. ${total}`, 10, productRowOffset);  
        
                        // Guardar el PDF  
                        doc.save('factura.pdf');  
                    } else {  
                        alert('No se encontraron facturas.');  
                    }  
                })  
                .catch(error => {  
                    alert('Error en la solicitud: ' + error.message);  
                    console.error('Error al obtener las facturas para el PDF:', error);  
                });  
        }  