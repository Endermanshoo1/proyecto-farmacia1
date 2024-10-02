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

document.addEventListener('DOMContentLoaded', () => {  
    const mostrarContenido = document.getElementById('Mostrarcontenido');  
    const usuariosPorPagina = 10;  
    let usuarios = [];  
    let paginaActual = 0;   

    const contenido = {  
        GestionProductos: `  
            <h2 class="tituloDahs">Gestión de Productos</h2>  
            <p class="subtituloDahs">Aquí puedes agregar, editar o eliminar productos.</p>  
            <form id="formAgregarProducto" enctype="multipart/form-data">  
                <input class="input" type="text" id="nombreProducto" placeholder="Nombre del producto" required> 
                <input type="file" class="input" name="imagen" id="imagen" required> 
                <input class="input" type="number" id="precioProducto" placeholder="Precio" required min="0">  
                <select class="input" id="categoriaProducto" required>  
                    <option value="" disabled selected>Seleccione una categoría</option>  
                    <option value="farmacia">Farmacia</option>  
                    <option value="hogar">Hogar</option>  
                    <option value="bebes">Bebés</option>  
                    <option value="cuidado personal">Cuidado Personal</option>  
                    <option value="belleza">Belleza</option>  
                </select>  
                <button class="Adminbutton" type="submit">Agregar Producto</button>  
            </form>  
        `,  
        ReportesVentas: `  
            <h2 class="tituloDahs">Reportes de Ventas</h2>  
            <p class="subtituloDahs">Aquí podrás ver los reportes de ventas.</p>  
        `,  
        Inventario: `  
            <h2 class="tituloDahs">Control de Inventario</h2>  
            <p class="subtituloDahs">Aquí puedes gestionar el inventario de productos.</p>  
        `,  
        GestionClientes: `  
            <h2 class="tituloDahs">Gestión de Usuarios</h2>  
            <p class="subtituloDahs">Aquí puedes gestionar la información de los Usuarios.</p>  
            <div id="usuariosContainer"></div>  
        `,  
        GestionAdmin: `  
            <h2 class="tituloDahs">Añadir Administradores</h2>  
            <p class="subtituloDahs">Aquí puedes añadir nuevos administradores.</p>  
            <form id="formAgregarAdmin">  
                <input type="text" id="adminNombre" placeholder="Nombre de usuario" required>  
                <input type="email" id="adminEmail" placeholder="Correo Electrónico" required>  
                <input type="password" id="adminPassword" placeholder="Contraseña" required>  
                <input type="password" id="verifypasword" placeholder="Confirme contraseña" required>  
                <button class="Adminbutton" type="submit">Añadir Administrador</button>  
            </form>  
        `  
    };  

    const links = document.querySelectorAll('.navegacion ul li a');  
    links.forEach(link => {  
        link.addEventListener('click', function(e) {  
            e.preventDefault();  
            const id = this.id;  
            mostrarContenido.innerHTML = '<div class="cargando">Cargando...</div>';  

            setTimeout(() => {  
                mostrarContenido.innerHTML = contenido[id] || 'Contenido no encontrado';  
                fadeIn(mostrarContenido);  

                if (id === 'GestionAdmin') {  
                    const form = document.getElementById('formAgregarAdmin');  
                    form.addEventListener('submit', async (e) => {  
                        e.preventDefault();  
                        const nombre = document.getElementById('adminNombre').value;  
                        const email = document.getElementById('adminEmail').value;  
                        const password = document.getElementById('adminPassword').value;  
                        const verifyPassword = document.getElementById('verifypasword').value;  
                        if (password !== verifyPassword) {  
                            alert('Las contraseñas no coinciden.');  
                            return;  
                        }  
                        try {  
                            const response = await fetch('/api/admins', {  
                                method: 'POST',  
                                headers: {  
                                    'Content-Type': 'application/json',  
                                },  
                                body: JSON.stringify({  
                                    username: nombre,  
                                    email: email,  
                                    password: password,  
                                }),  
                            });  
                            if (response.ok) {  
                                alert('Administrador agregado exitosamente');  
                                form.reset();  
                            } else {  
                                alert('Error al agregar el administrador.');  
                            }  
                        } catch (error) {  
                            console.error('Error al agregar el administrador:', error);  
                        }  
                    });  
                } else if (id === 'GestionClientes') {  
                    mostrarUsuarios();  
                }  else if(id === 'GestionProductos') {
                    const formAgregarProducto = document.getElementById('formAgregarProducto');  
                    formAgregarProducto.addEventListener('submit', async (e) => {  
                        e.preventDefault();  

                        const productoNombre = document.getElementById('nombreProducto').value;  
                        const productoPrecio = document.getElementById('precioProducto').value;  
                        const categoriaProducto = document.getElementById('categoriaProducto').value;  
                        const fileField = document.getElementById('imagen');  

                        // Validar que todos los campos están completos  
                        if (!productoNombre || !productoPrecio || !categoriaProducto || !fileField.files.length) {  
                            alert('Por favor, completa todos los campos.');  
                            return;  
                        }  

                        // Validar que el precio es un número  
                        if (isNaN(productoPrecio) || Number(productoPrecio) <= 0) {  
                            alert('El precio debe ser un número positivo.');  
                            return;  
                        }  

                        // Validar que el tamaño de la imagen no exceda de 2MB  
                        const file = fileField.files[0];  
                        if (file && file.size > 2 * 1024 * 1024) { // 2 MB  
                            alert('La imagen debe ser menor a 2MB.');  
                            return;  
                        }  

                        const formData = new FormData();  
                        formData.append('nombre', productoNombre);  
                        formData.append('precio', productoPrecio);  
                        formData.append('categoria', categoriaProducto);  
                        formData.append('imagen', fileField.files[0]);  

                        try {  
                            const response = await fetch('/api/productos', {  
                                method: 'POST',  
                                body: formData,  
                            });  

                            if (response.ok) {  
                                alert('Producto agregado exitosamente');  
                                formAgregarProducto.reset();  
                                mostrarProductos();  
                            } else {  
                                const errorData = await response.json();  
                                alert(`Error: ${errorData.mensaje || 'Error al agregar el producto.'}`);  
                            }  
                        } catch (error) {  
                            console.error('Error al agregar el producto:', error);  
                            alert('Error desconocido al intentar agregar el producto.');  
                        }  
                    });  
                }

            }, 1000);  
        });  
    });  

    const mostrarUsuarios = async () => {  
        try {  
            const response = await fetch('/api/users');  
            usuarios = await response.json();  
            
            mostrarUsuariosPorPagina();  
        } catch (error) {  
            console.error('Error al obtener los usuarios:', error);  
        }  
    };  

    const mostrarUsuariosPorPagina = () => {  
        const usuariosContainer = document.getElementById('usuariosContainer');  
        usuariosContainer.innerHTML = '';  
    
        // Crear la tabla y los encabezados  
        const table = document.createElement('table');  
        const thead = document.createElement('thead');  
        const tbody = document.createElement('tbody');  
    
        // Crear la fila de encabezados  
        const headerRow = document.createElement('tr');  
        headerRow.innerHTML = `  
            <th>Nombre de Usuario</th>  
            <th>Email</th>  
            <th>Acciones</th>  
        `;  
        thead.appendChild(headerRow);  
        table.appendChild(thead);  
    
        const inicio = paginaActual * usuariosPorPagina;  
        const fin = inicio + usuariosPorPagina;  
        const usuariosAMostrar = usuarios.slice(inicio, fin);  
    
        usuariosAMostrar.forEach(usuario => {  
            const row = document.createElement('tr');  
            row.setAttribute('data-id', usuario.id);  
            row.innerHTML = `  
                <td>${usuario.username}</td>  
                <td>${usuario.email}</td>  
                <td>  
                    <button class="editarUsuario">Editar</button>  
                    <button class="eliminarUsuario">Eliminar</button>  
                </td>  
            `;  
            tbody.appendChild(row);  
        });  
    
        table.appendChild(tbody);  
        usuariosContainer.appendChild(table);  
    
        agregarEventosAUsuarios();  
        agregarNavegacionPaginacion();  
    };  

    const agregarNavegacionPaginacion = () => {  
        const paginacionHTML = document.createElement('div');  
        paginacionHTML.classList.add('paginacion');  

        const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);  

        const btnAnterior = document.createElement('button');  
        btnAnterior.textContent = 'Anterior';  
        btnAnterior.addEventListener('click', () => {  
            if (paginaActual > 0) {  
                paginaActual--;  
                mostrarUsuariosPorPagina();  
                agregarNavegacionPaginacion();  
            }  
        });  
        paginacionHTML.appendChild(btnAnterior);  

        const paginaLabel = document.createElement('span');  
        paginaLabel.textContent = ` Página ${paginaActual + 1} de ${totalPaginas} `;  
        paginacionHTML.appendChild(paginaLabel);  

        const btnSiguiente = document.createElement('button');  
        btnSiguiente.textContent = 'Siguiente';  
        btnSiguiente.addEventListener('click', () => {  
            if (paginaActual < totalPaginas - 1) {  
                paginaActual++;  
                mostrarUsuariosPorPagina();  
                agregarNavegacionPaginacion();  
            }  
        });  
        paginacionHTML.appendChild(btnSiguiente);  

        const usuariosContainer = document.getElementById('usuariosContainer');  
        const paginacionExistente = document.querySelector('.paginacion');  
        if (paginacionExistente) {  
            paginacionExistente.remove();  
        }  
        usuariosContainer.appendChild(paginacionHTML);  
    };  

    const agregarEventosAUsuarios = () => {  
        document.querySelectorAll('.editarUsuario').forEach(button => {  
            button.addEventListener('click', editarUsuario);  
        });  
        document.querySelectorAll('.eliminarUsuario').forEach(button => {  
            button.addEventListener('click', eliminarUsuario);  
        });  
    };  

    const editarUsuario = async (event) => {  
        const row = event.target.closest('tr');  
        const userId = row.getAttribute('data-id');  
        const newUsername = prompt('Ingrese nuevo nombre:', row.children[0].textContent);  
        const newEmail = prompt('Ingrese nuevo email:', row.children[1].textContent);  

        if (newUsername && newEmail) {  
            try {  
                const response = await fetch(`/api/users/${userId}`, {  
                    method: 'PUT',  
                    headers: {  
                        'Content-Type': 'application/json',  
                    },  
                    body: JSON.stringify({ username: newUsername, email: newEmail })  
                });  
                if (response.ok) {  
                    alert('Usuario actualizado exitosamente');  
                    mostrarUsuarios();  
                } else {  
                    alert('Error al actualizar el usuario.');  
                }  
            } catch (error) {  
                console.error('Error al actualizar el usuario:', error);  
            }  
        }  
    };  

    const eliminarUsuario = async (event) => {  
        const row = event.target.closest('tr');  
        const userId = row.getAttribute('data-id');  

        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {  
            try {  
                const response = await fetch(`/api/users/${userId}`, {  
                    method: 'DELETE',  
                });  
                if (response.ok) {  
                    alert('Usuario eliminado exitosamente');  
                    mostrarUsuarios();  
                } else {  
                    alert('Error al eliminar el usuario.');  
                }  
            } catch (error) {  
                console.error('Error al eliminar el usuario:', error);  
            }  
        }  
    };  

    
  

    function fadeIn(element) {  
        element.style.opacity = 0;  
        element.style.transition = 'opacity 0.5s ease';  
        element.style.opacity = 1;  
    }  
}); 