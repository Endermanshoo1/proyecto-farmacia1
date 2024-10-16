const signUpButton = document.getElementById('signUp');  
const signInButton = document.getElementById('signIn');  
const container = document.getElementById('container');  

signUpButton.addEventListener('click', () => {  
    container.classList.add("right-panel-active");  
});  

signInButton.addEventListener('click', () => {  
    container.classList.remove("right-panel-active");  
});  

document.addEventListener("DOMContentLoaded", () => {  
    const registerForm = document.getElementById('register-form');  
    const loginForm = document.getElementById('login-form');  
    const emailVal = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*$/i;  
    const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[\S]+$/;  

    // Función para validar el email  
    function validateEmail(emailField) {  
        if (!emailVal.test(emailField.value.toLowerCase())) {  
            emailField.style.border = '1px solid red';  
        } else {  
            emailField.style.border = '1px solid #80ebce';  
        }  
    }  

    // Función para validar la contraseña  
    function validatePassword(passwordField) {  
        if (!passwordVal.test(passwordField.value)) {  
            passwordField.style.border = '1px solid red';  
        } else {  
            passwordField.style.border = '1px solid #80ebce';  
        }  
    }  

    // Registro  
    registerForm.addEventListener('submit', async (event) => {  
        event.preventDefault();  

        const username = document.getElementById('user-register').value.trim();  
        const email = document.getElementById('email-register');  
        const password = document.getElementById('password-register');  
        const confirmPassword = document.getElementById('confirmPassword');  

        // Limpiar errores anteriores  
        email.style.border = '';  
        password.style.border = '';  
        confirmPassword.style.border = '';  

        let valid = true;  

        // Validar email  
        validateEmail(email);  

        // Validar contraseña  
        validatePassword(password);  

        // Validar contraseña de confirmación  
        if (password.value !== confirmPassword.value) {  
            confirmPassword.style.border = '1px solid red';  
            alert('Las contraseñas no coinciden.');  
            valid = false;  
        } else {  
            confirmPassword.style.border = '1px solid #80ebce';  
        }  

        if (!valid || !username) {  
            alert('Por favor, completa todos los campos correctamente.');  
            return;  
        }  

        try {  
            const response = await fetch('/api/auth/register', {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json',  
                },  
                body: JSON.stringify({ username, email: email.value, password: password.value }),  
            });  

            if (!response.ok) {  
                const errorData = await response.json();  
                document.querySelector('.error').classList.remove('escondido');  
                document.querySelector('.error').textContent = errorData.message || 'Error al registrarse';  
                return;  
            }  

            const data = await response.json();  
            alert(data.message || 'Registro exitoso!');  
            registerForm.reset(); // Limpia el formulario tras un registro exitoso  

        } catch (error) {  
            console.error('Error en la solicitud de registro:', error);  
            document.querySelector('.error').classList.remove('escondido');  
            document.querySelector('.error').textContent = 'Ocurrió un error al registrarse. Intenta de nuevo más tarde.';  
        }  
    });  

    // Validaciones en vivo para el formulario de registro  
    document.getElementById('email-register').addEventListener('input', (event) => {  
        validateEmail(event.target);  
    });  

    document.getElementById('password-register').addEventListener('input', (event) => {  
        validatePassword(event.target);  
    });  

    document.getElementById('confirmPassword').addEventListener('input', () => {  
        const password = document.getElementById('password-register');  
        if (password.value !== event.target.value) {  
            event.target.style.border = '1px solid red';  
        } else {  
            event.target.style.border = '1px solid #80ebce';  
        }  
    });  

    // Inicio de sesión  
    loginForm.addEventListener('submit', async (event) => {  
        event.preventDefault();  
    
        const email = document.getElementById('user-login');  
        const password = document.getElementById('password-login');  
    
        // Limpia los estilos de borde antes de realizar la validación  
        email.style.border = '';  
        password.style.border = '';  
    
        // Validación en tiempo real  
        validateEmail(email);  
        validatePassword(password);  
    
        // Siempre podemos decidir si el formulario es válido después de validar  
        if (!emailVal.test(email.value.toLowerCase()) || !passwordVal.test(password.value)) {  
            alert('Por favor, completa ambos campos correctamente.');  
            return;  
        }  
    
        try {  
            const response = await fetch('/api/auth/login', {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json',  
                },  
                body: JSON.stringify({   
                    email: email.value.toLowerCase(),   
                    password: password.value   
                }),  
            });  
    
            if (!response.ok) {  
                const errorData = await response.json();  
                document.querySelector('.error').classList.remove('escondido');  
                document.querySelector('.error').textContent = errorData.message || 'Error al iniciar sesión';  
                return;  
            }   
    
            const data = await response.json();  
     
            // Asegúrate de que el backend esté configurado para enviar el token en una cookie segura  
            if (data.token) {   
                document.cookie = `token=${data.token}; Secure; HttpOnly; path=/;`;  
            } else {  
                console.error('Token no recibido');  
                document.querySelector('.error').classList.remove('escondido');  
                document.querySelector('.error').textContent = 'Error al recibir el token. Intenta de nuevo.';  
                return;  
            }  
    
            // Redirigir según el rol del usuario  
            if (data.user && data.user.role) {  
                if (data.user.role === 'admin') {  
                    window.location.href = '/admin';  // Redirige a la página de administrador  
                } else {  
                    window.location.href = '/user';   // Redirige a la página de usuario  
                }  
            } else {  
                console.error('El usuario o su rol no están definidos en la respuesta.');  
                document.querySelector('.error').classList.remove('escondido');  
                document.querySelector('.error').textContent = 'Error al recibir la información del usuario. Intenta de nuevo.';  
            }  
        } catch (error) {  
            console.error('Error en la solicitud de inicio de sesión:', error);  
            document.querySelector('.error').classList.remove('escondido');  
            document.querySelector('.error').textContent = 'Ocurrió un error al intentar iniciar sesión. Intenta de nuevo más tarde.';  
        }  
    });  
    
    // Validaciones en vivo para el formulario de inicio de sesión  
    document.getElementById('user-login').addEventListener('input', (event) => {  
        validateEmail(event.target);  
    });  
    
    document.getElementById('password-login').addEventListener('input', (event) => {  
        validatePassword(event.target);  
    });    
});  