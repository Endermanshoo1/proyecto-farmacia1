
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

//cartas

const contenedorTarjetasOfertas = document.getElementById("cartas-frex")

function crearTarjetasProductosOfertas(ofertasDeMes){
    ofertasDeMes.forEach(ofertasDeMes =>{
        const nuevoProducto = document.createElement('div')
        nuevoProducto.classList = "card"
        nuevoProducto.innerHTML =
        `
        <div class= "imgBx">
                <img src="${ofertasDeMes.img}">
        </div>
        <div class=content>
            <div class="details">
            <h2 class="details">${ofertasDeMes.nombre}</h2>
            <p class="details">${ofertasDeMes.precio}</p>
            </div>
            <div class="botones">
                <span class="like"><i class='bx bx-like'></i></span>  
                <button class="carrito"><i class="bx bxs-cart-add"></i></button>
            </div>
        </div>
        `
        contenedorTarjetasOfertas.appendChild(nuevoProducto)
        nuevoProducto.getElementsByTagName("button")[0].addEventListener("click",()=> agregarAlCarrito(ofertasDeMes))
    })
}

crearTarjetasProductosOfertas(ofertasDeMes)

//barra
/*const categoria = document.querySelector('#categoria')
document.addEventListener('DOMContentLoaded',mostrarMenu)
async function mostrarMenu(menu) {
    const menu = document.createElement('ul')
    menu.innerHTML += `
    <li>
                    <a id="Farmacia" href="/view/secciones/farmacia.html">
                        <i class='bx bx-injection icon'></i>
                        <span>Farmacia</span>
                    </a>
                </li>
                <li>
                    <a id="Belleza" href="/view/secciones/belleza.html">
                        <i class='bx bxs-face icon'></i>
                        <span>Belleza</span>
                    </a>
                </li>
                <li>
                    <a id="Comestibles" href="/view/secciones/comestibles.html">
                        <i class='bx bx-donate-heart icon'></i>
                        <span>Comestibles</span>
                    </a>
                </li>
                <li>
                    <a id="Bebes" href="/view/secciones/bebes.html">
                        <i class='bx bxs-baby-carriage icon'></i>
                        <span>Bebes</span>
                    </a>
                </li>
                <li>
                    <a id="Cuidado-Personal" href="/view/secciones/cuidado-personal.html">
                        <i class='bx bxs-face icon'></i>
                        <span>Cuidado Personal</span>
                    </a>
                </li>
                <li>
                    <a id="Hogar" href="/view/secciones/hogar.html">
                        <i class='bx bx-home icon'></i>
                        <span>Hogar</span>
                    </a>
                </li>
                <li>
                    <a id="Carrito" href="/view/carrito/index.html">
                        <i class='bx bx-cart-add icon'></i>
                        <span>Carrito</span>
                        <span id="cuenta-carrito">0</span>
                    </a>
                </li>
    `
    categoria.appendChild(menu)
}*/

//scroller

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

//busqueda 

const search = () =>{
    const searchBox = document.getElementById("search-item").value.toUpperCase();
    const storeItems = document.getElementById("")
}

//cartas farmacia

const contenedorTarjetasFarmacia = document.getElementById("cartas-frex2")

function crearTarjetasfarmacia(farmacia){
    farmacia.forEach(farmacia =>{
        const nuevoProducto2 = document.createElement('div')
        nuevoProducto2.classList = "card"
        nuevoProducto2.innerHTML =
        `
        <div class= "imgBx">
                <img src="${farmacia.img}">
        </div>
        <div class=content>
            <div class="details">
            <h2 class="details">${farmacia.nombre}</h2>
            <p class="details">${farmacia.precio}</p>
            </div>
            <div class="botones">
                <span class="like"><i class='bx bx-like'></i></span>  
                <button class="carrito"><i class="bx bxs-cart-add"></i></button>
            </div>
        </div>
        `
        contenedorTarjetasFarmacia.appendChild(nuevoProducto2)
        nuevoProducto2.getElementsByTagName("button")[0].addEventListener("click",()=> agregarAlCarrito(farmacia))
    })
}

crearTarjetasfarmacia(farmacia)

//cartas belleza

const contenedorTarjetasBelleza = document.getElementById("cartas-frex3")

function crearTarjetasBelleza(belleza){
    belleza.forEach(belleza =>{
        const nuevoProducto3 = document.createElement('div')
        nuevoProducto3.classList = "card"
        nuevoProducto3.innerHTML =
        `
        <div class= "imgBx">
                <img src="${belleza.img}">
        </div>
        <div class=content>
            <div class="details">
            <h2 class="details">${belleza.nombre}</h2>
            <p class="details">${belleza.precio}</p>
            </div>
            <div class="botones">
                <span class="like"><i class='bx bx-like'></i></span>  
                <button class="carrito"><i class="bx bxs-cart-add"></i></button>
            </div>
        </div>
        `
        contenedorTarjetasBelleza.appendChild(nuevoProducto3)
        nuevoProducto3.getElementsByTagName("button")[0].addEventListener("click",()=> agregarAlCarrito(belleza))
    })
}

crearTarjetasBelleza(belleza)

//cartas comestible

const contenedorTarjetasComestibles = document.getElementById("cartas-frex4")

function crearTarjetaComestible(comestibles){
    comestibles.forEach(comestibles =>{
        const nuevoProducto4 = document.createElement('div')
        nuevoProducto4.classList = "card"
        nuevoProducto4.innerHTML =
        `
        <div class= "imgBx">
                <img src="${comestibles.img}">
        </div>
        <div class=content>
            <div class="details">
            <h2 class="details">${comestibles.nombre}</h2>
            <p class="details">${comestibles.precio}</p>
            </div>
            <div class="botones">
                <span class="like"><i class='bx bx-like'></i></span>  
                <button class="carrito"><i class="bx bxs-cart-add"></i></button>
            </div>
        </div>
        `
        contenedorTarjetasComestibles.appendChild(nuevoProducto4)
        nuevoProducto4.getElementsByTagName("button")[0].addEventListener("click",()=> agregarAlCarrito(comestibles))
    })
}

crearTarjetaComestible(comestibles)

//cartas Bebes

const contenedorTarjetasBebes = document.getElementById("cartas-frex5")

function crearTarjetaBebes(bebes){
    bebes.forEach(bebes =>{
        const nuevoProducto5 = document.createElement('div')
        nuevoProducto5.classList = "card"
        nuevoProducto5.innerHTML =
        `
        <div class= "imgBx">
                <img src="${bebes.img}">
        </div>
        <div class=content>
            <div class="details">
            <h2 class="details">${bebes.nombre}</h2>
            <p class="details">${bebes.precio}</p>
            </div>
            <div class="botones">
                <span class="like"><i class='bx bx-like'></i></span>  
                <button class="carrito"><i class="bx bxs-cart-add"></i></button>
            </div>
        </div>
        `
        contenedorTarjetasBebes.appendChild(nuevoProducto5)
        nuevoProducto5.getElementsByTagName("button")[0].addEventListener("click",()=> agregarAlCarrito(bebes))
    })
}

crearTarjetaBebes(bebes)

//cartas cuidado personal

const contenedorTarjetasCuidadoPersonal = document.getElementById("cartas-frex6")

function crearTarjetaCuidadoPersonal(cuidadoPersonal){
    cuidadoPersonal.forEach(cuidadoPersonal =>{
        const nuevoProducto6 = document.createElement('div')
        nuevoProducto6.classList = "card"
        nuevoProducto6.innerHTML =
        `
        <div class= "imgBx">
                <img src="${cuidadoPersonal.img}">
        </div>
        <div class=content>
            <div class="details">
            <h2 class="details">${cuidadoPersonal.nombre}</h2>
            <p class="details">${cuidadoPersonal.precio}</p>
            </div>
            <div class="botones">
                <span class="like"><i class='bx bx-like'></i></span>  
                <button class="carrito"><i class="bx bxs-cart-add"></i></button>
            </div>
        </div>
        `
        contenedorTarjetasCuidadoPersonal.appendChild(nuevoProducto6)
        nuevoProducto6.getElementsByTagName("button")[0].addEventListener("click",()=> agregarAlCarrito(cuidadoPersonal))
    })
}

crearTarjetaCuidadoPersonal(cuidadoPersonal)

//cartas hogar

const contenedorTarjetasHogar = document.getElementById("cartas-frex7")

function crearTarjetaHogar(hogar){
    hogar.forEach(hogar =>{
        const nuevoProducto = document.createElement('div')
        nuevoProducto.classList = "card"
        nuevoProducto.innerHTML =
        `
        <div class= "imgBx">
                <img src="${hogar.img}">
        </div>
        <div class=content>
            <div class="details">
            <h2 class="details">${hogar.nombre}</h2>
            <p class="details">${hogar.precio}</p>
            </div>
            <div class="botones">
                <span class="like"><i class='bx bx-like'></i></span>  
                <button class="carrito"><i class="bx bxs-cart-add"></i></button>
            </div>
        </div>
        `
        contenedorTarjetasHogar.appendChild(nuevoProducto)
        nuevoProducto.getElementsByTagName("button")[0].addEventListener("click",()=> agregarAlCarrito(hogar))
    })
}

crearTarjetaHogar(hogar)

