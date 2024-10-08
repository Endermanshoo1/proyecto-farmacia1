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

document.addEventListener("DOMContentLoaded", () => {  
    document.getElementById("cerrarsesion").addEventListener("click", () => {  
        document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';  
        document.location.href = "/";  
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
                    <option value="ofertasdelmes">Ofertas del Mes</option>  
                    <option value="farmacia">Farmacia</option>  
                    <option value="hogar">Hogar</option>  
                    <option value="bebes">Bebés</option> 
                    <option value="comestibles">Comestibles</option> 
                    <option value="cuidadopersonal">Cuidado Personal</option>    
                    <option value="belleza">Belleza</option>  
                </select>  
                <button class="Adminbutton" type="submit">Agregar Producto</button>  
            </form>  
            <div id="productosContainer"></div>
        `,  
        ReportesVentas: `  
            <h2 class="tituloDahs">Reportes de Ventas</h2>  
            <p class="subtituloDahs">Aquí podrás ver los reportes de ventas.</p>  
        `,  
        Inventario: `  
             <h2 class="tituloDahs">Control de Inventario</h2>  
            <p class="subtituloDahs">Aquí puedes gestionar el inventario de productos.</p>  
            <table id="tablaInventario" class="tabla">  
                <thead>  
                    <tr>  
                        <th>Nombre del Producto</th>  
                        <th>Cantidad en Stock</th>  
                        <th>Acciones</th>  
                    </tr>  
                </thead>  
                <tbody id="productosBody"></tbody>  
            </table>    
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

                    // Función para mostrar productos  
                    const mostrarProductos = async () => {  
                        const productosContainer = document.getElementById('productosContainer');  
                        productosContainer.innerHTML = ''; // Limpiar el contenedor  
                    
                        try {  
                            const response = await fetch('/api/productos'); // Asegúrate de que esta URL sea correcta  
                            const productos = await response.json();  
                            
                            // Verificar si hay productos  
                            if (!Array.isArray(productos) || productos.length === 0) {  
                                productosContainer.innerHTML = '<p>No hay productos disponibles.</p>';  
                                return;  
                            }  
                    
                            const table = document.createElement('table');  
                            const thead = document.createElement('thead');  
                            const tbody = document.createElement('tbody');  
                    
                            // Crear la fila de encabezados  
                            const headerRow = document.createElement('tr');  
                            headerRow.innerHTML = `  
                                <th>Nombre</th>  
                                <th>Precio</th>  
                                <th>Categoría</th>    
                                <th>Acciones</th>  
                            `;  
                            thead.appendChild(headerRow);  
                            table.appendChild(thead);  
                    
                            productos.forEach(producto => {  
                                const row = document.createElement('tr');  
                                row.setAttribute('data-id', producto._id);  
                                row.innerHTML = `  
                                    <td>${producto.nombre}</td>  
                                    <td>Bs. ${producto.precio}</td>  
                                    <td>${producto.categoria}</td>    
                                    <td>  
                                        <button id="editarProducto" class="editarUsuario">Editar</button>  
                                        <button id="eliminarProducto" class="eliminarUsuario">Eliminar</button>  
                                    </td>  
                                `;  
                                tbody.appendChild(row);  
                            });  
                    
                            table.appendChild(tbody);  
                            productosContainer.appendChild(table);  
                    
                            agregarEventosAProductos(); // Asegúrate de tener esta función definida  
                        } catch (error) {  
                            console.error('Error al obtener los productos:', error);  
                            productosContainer.innerHTML = '<p>Error al cargar productos. Intenta nuevamente más tarde.</p>';  
                        }  
                    }; mostrarProductos()
                    
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
                                await mostrarProductos(); // Llama a mostrarProductos para actualizar la lista  
                            } else {  
                                const errorData = await response.json();  
                                alert(`Error: ${errorData.mensaje || 'Error al agregar el producto.'}`);  
                            }  
                        } catch (error) {  
                            console.error('Error al agregar el producto:', error);  
                            alert('Error desconocido al intentar agregar el producto.');  
                        }  
                    });  

                    let productIdToEdit; // Variable para almacenar el ID del producto que será editado  
                    let productIdToDelete; // Variable para almacenar el ID del producto que será eliminado  

                    const agregarEventosAProductos = () => {  
                        // Agregar eventos a los botones de editar  
                        document.querySelectorAll('#editarProducto').forEach(button => {  
                            button.addEventListener('click', (event) => {  
                                const row = event.target.closest('tr');  
                                productIdToEdit = row.getAttribute('data-id');   
                                document.getElementById('editarNombre').value = row.children[0].textContent;  
                                document.getElementById('editarPrecio').value = row.children[1].textContent;  
                                document.getElementById('editarCategoria').value = row.children[2].textContent;  
                                document.getElementById('modalEditarProducto').style.display = 'block'; // Abre el modal de editar  
                            });  
                        });   

                        // Agregar eventos a los botones de eliminar  
                        document.querySelectorAll('#eliminarProducto').forEach(button => {  
                            button.addEventListener('click', (event) => {  
                                const row = event.target.closest('tr');  
                                productIdToDelete = row.getAttribute('data-id');  
                                document.getElementById('modalEliminarProducto').style.display = 'block'; // Abre el modal de eliminar  
                            });  
                        });  
                    };  

                    // Guardar cambios en el producto  
                    document.getElementById('formEditarProducto').addEventListener('submit', async (event) => {  
                        event.preventDefault(); // Prevenir el envío por defecto del formulario  

                        const newNombre = document.getElementById('editarNombre').value;  
                        const newPrecio = document.getElementById('editarPrecio').value;  
                        const newCategoria = document.getElementById('editarCategoria').value;  

                        try {  
                            const response = await fetch(`/api/productos/${productIdToEdit}`, {  
                                method: 'PUT',  
                                headers: {  
                                    'Content-Type': 'application/json',  
                                },  
                                body: JSON.stringify({ nombre: newNombre, precio: newPrecio, categoria: newCategoria })  
                            });  

                            if (response.ok) {  
                                alert('Producto actualizado exitosamente');  
                                await mostrarProductos(); // Actualizar la lista de productos  
                            } else {  
                                alert('Error al actualizar el producto.');  
                            }  
                        } catch (error) {  
                            console.error('Error al actualizar el producto:', error);  
                        } finally {  
                            document.getElementById('modalEditarProducto').style.display = 'none'; // Cerrar modal  
                        }  
                    });  

                    // Confirmar eliminación del producto  
                    document.getElementById('confirmarEliminarProducto').addEventListener('click', async () => {  
                        try {  
                            const response = await fetch(`/api/productos/${productIdToDelete}`, {  
                                method: 'DELETE',  
                            });  

                            if (response.ok) {  
                                alert('Producto eliminado exitosamente');  
                                await mostrarProductos(); // Actualizar la lista de productos  
                            } else {  
                                alert('Error al eliminar el producto.');  
                            }  
                        } catch (error) {  
                            console.error('Error al eliminar el producto:', error);  
                        } finally {  
                            document.getElementById('modalEliminarProducto').style.display = 'none'; // Cerrar modal  
                        }  
                    });  

                    // Cerrar modales  
                    document.querySelectorAll('.close').forEach(el => {  
                        el.addEventListener('click', () => {  
                            el.closest('.modal').style.display = 'none';  
                        });  
                    });  

                    // Cerrar la modal al hacer clic fuera de ella  
                    window.addEventListener('click', (event) => {  
                        if (event.target.classList.contains('modal')) {  
                            event.target.style.display = 'none';  
                        }  
                    });  

                    // Cancelar eliminación  
                    document.getElementById('cancelarEliminarProducto').addEventListener('click', () => {  
                        document.getElementById('modalEliminarProducto').style.display = 'none';  
                    });       
                    document.addEventListener('DOMContentLoaded', mostrarProductos);  
                }  else if(id === 'Inventario') {
                    cargarProductos()
                    async function cargarProductos() {  
                        const productosBody = document.getElementById('productosBody');  
                        productosBody.innerHTML = ''; // Limpiamos el contenido previo  
                    
                        try {  
                            const response = await fetch('/api/productos');  
                            
                            // Verifica si la respuesta es exitosa  
                            if (!response.ok) {  
                                throw new Error(`Error en la respuesta: ${response.status} - ${response.statusText}`);  
                            }  
                    
                            const productos = await response.json();  
                    
                            // Verifica si hay productos en el response  
                            if (!Array.isArray(productos) || productos.length === 0) {  
                                productosBody.innerHTML = '<tr><td colspan="3">No hay productos disponibles.</td></tr>';  
                                return;  
                            }  
                    
                            productos.forEach(producto => {  
                                const fila = document.createElement('tr');  
                    
                                // Columna para el nombre del producto  
                                const celdaNombre = document.createElement('td');  
                                celdaNombre.textContent = producto.nombre;  
                                fila.appendChild(celdaNombre);  
                    
                                // Columna para la cantidad en stock  
                                const celdaStock = document.createElement('td');  
                                celdaStock.textContent = producto.stock;  
                                fila.appendChild(celdaStock);  
                    
                                // Columna para las acciones (botón para editar)  
                                const celdaAcciones = document.createElement('td');  
                                const botonEditar = document.createElement('button');  
                                botonEditar.textContent = 'Editar Cantidad';  
                                botonEditar.className = 'editarCantidad'
                                botonEditar.onclick = () => editarCantidad(producto._id); // Llama a la función para editar  
                                celdaAcciones.appendChild(botonEditar);  
                                fila.appendChild(celdaAcciones);  
                    
                                productosBody.appendChild(fila);  
                            });  
                        } catch (error) {  
                            console.error('Error al cargar productos:', error);  
                            productosBody.innerHTML = '<tr><td colspan="3">Error al cargar productos.</td></tr>'; // Mensaje de error  
                        }  
                    }  
                    
                    // Función para editar la cantidad de un producto  
                    function editarCantidad(id) {  
                        const nuevaCantidad = prompt("Ingrese la nueva cantidad:");  
                    
                        // Comprueba que la entrada no sea nula y que sea un número válido  
                        if (nuevaCantidad !== null && !isNaN(nuevaCantidad) && nuevaCantidad >= 0) {  
                            actualizarCantidadEnBD(id, Number(nuevaCantidad)); // Convertir a número para enviar al servidor  
                        } else {  
                            alert("Por favor, ingrese un número válido.");  
                        }  
                    }  
                    
                    // Función para actualizar la cantidad en la base de datos  
                    async function actualizarCantidadEnBD(id, nuevaCantidad) {  
                        try {  
                            const response = await fetch(`/api/productos/${id}`, {  
                                method: 'PUT',  
                                headers: { 'Content-Type': 'application/json' },  
                                body: JSON.stringify({ stock: nuevaCantidad }) // Enviamos el nuevo stock  
                            });  
                    
                            if (response.ok) {  
                                alert("Cantidad actualizada con éxito.");  
                                cargarProductos(); // Recargar la lista de productos  
                            } else {  
                                alert("Error al actualizar la cantidad.");  
                            }  
                        } catch (error) {  
                            console.error('Error al actualizar la cantidad:', error);  
                        }  
                    }  
                    
                    // Llamar a la función para cargar productos cuando se cargue la página  
                    document.addEventListener('DOMContentLoaded', cargarProductos); 
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
            row.setAttribute('data-id', usuario._id);  
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

    let userIdToEdit = null;  
    let userIdToDelete = null;  
    
    // Función para abrir la ventana de edición  
    const editarUsuario = (event) => {  
        const row = event.target.closest('tr');  
        userIdToEdit = row.getAttribute('data-id');  
    
        // Rellenar los campos del formulario  
        document.getElementById('nuevoNombre').value = row.children[0].textContent;  
        document.getElementById('nuevoEmail').value = row.children[1].textContent;  
    
        // Mostrar la modal de Edición  
        document.getElementById('modalEditar').style.display = 'block';  
    };  
    
    // Función para manejar el envío del formulario de edición  
    document.getElementById('formEditarUsuario').addEventListener('submit', async (event) => {  
        event.preventDefault();  
        
        const newUsername = document.getElementById('nuevoNombre').value;  
        const newEmail = document.getElementById('nuevoEmail').value;  
    
        try {  
            const response = await fetch(`/api/users/${userIdToEdit}`, {  
                method: 'PUT',  
                headers: {  
                    'Content-Type': 'application/json',  
                },  
                body: JSON.stringify({ username: newUsername, email: newEmail })  
            });  
            
            if (response.ok) {  
                alert('Usuario actualizado exitosamente');  
                mostrarUsuarios(); // Asumiendo que esta función actualiza la lista de usuarios  
            } else {  
                alert('Error al actualizar el usuario.');  
            }  
    
            // Cerrar la modal  
            document.getElementById('modalEditar').style.display = 'none';  
        } catch (error) {  
            console.error('Error al actualizar el usuario:', error);  
        }  
    });  
    
    // Función para abrir la ventana de eliminación  
    const eliminarUsuario = (event) => {  
        const row = event.target.closest('tr');  
        userIdToDelete = row.getAttribute('data-id');  
    
        // Mostrar la modal de eliminación  
        document.getElementById('modalEliminar').style.display = 'block';  
    };  
    
    // Confirmar eliminación  
    document.getElementById('confirmarEliminar').addEventListener('click', async () => {  
        try {  
            const response = await fetch(`/api/users/${userIdToDelete}`, {  
                method: 'DELETE',  
            });  
            
            if (response.ok) {  
                alert('Usuario eliminado exitosamente');  
                mostrarUsuarios(); // Asumiendo que esta función actualiza la lista de usuarios  
            } else {  
                alert('Error al eliminar el usuario.');  
            }  
    
            // Cerrar la modal  
            document.getElementById('modalEliminar').style.display = 'none';  
        } catch (error) {  
            console.error('Error al eliminar el usuario:', error);  
        }  
    });  
    
    // Añadir manejadores de eventos para cerrar las modales  
    document.getElementById('closeEditar').onclick = () => {  
        document.getElementById('modalEditar').style.display = 'none';  
    };  
    
    document.getElementById('closeEliminar').onclick = () => {  
        document.getElementById('modalEliminar').style.display = 'none';  
    };  
    
    // Cerrar modales al hacer clic fuera de ellas  
    window.onclick = (event) => {  
        const modalEditar = document.getElementById('modalEditar');  
        const modalEliminar = document.getElementById('modalEliminar');  
    
        if (event.target === modalEditar) {  
            modalEditar.style.display = 'none';  
        }  
        if (event.target === modalEliminar) {  
            modalEliminar.style.display = 'none';    
        }  
    };  
    
    // Cancelar eliminación  
    document.getElementById('cancelarEliminar').addEventListener('click', () => {  
        document.getElementById('modalEliminar').style.display = 'none';  
    });  

    function fadeIn(element) {  
        element.style.opacity = 0;  
        element.style.transition = 'opacity 0.5s ease';  
        element.style.opacity = 1;  
    }  
}); 