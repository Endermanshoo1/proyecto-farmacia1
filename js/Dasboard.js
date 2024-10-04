
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
    document.getElementById("cerrarsesion").addEventListener("click", () => {  
        document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';  
        document.location.href = "/";  
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
                    <span class="like"><i class='bx bx-like'></i></span>  
                    <button class="carrito"><i class="bx bxs-cart-add"></i></button>  
                </div>  
            </div>  
        `;  
        contenedor.appendChild(nuevoProducto);  
        
        // Agregar listener al botón de carrito  
        nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto));  
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
                <span class="like"><i class='bx bx-like'></i></span>  
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
                <span class="like"><i class='bx bx-like'></i></span>  
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
                <span class="like"><i class='bx bx-like'></i></span>  
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
                <span class="like"><i class='bx bx-like'></i></span>  
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
                <span class="like"><i class='bx bx-like'></i></span>  
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
                <span class="like"><i class='bx bx-like'></i></span>  
                <button class="carrito"><i class="bx bxs-cart-add"></i></button>  
            </div>  
        </div>  
        `;  
        contenedorTarjetasHogar.appendChild(nuevoProducto);  
        nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(hogar));  
    });  
}  
  
crearTarjetaHogar(hogar); 