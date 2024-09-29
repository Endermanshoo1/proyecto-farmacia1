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

    // Registro  
    registerForm.addEventListener('submit', async (event) => {  
        event.preventDefault();  

        const username = document.getElementById('user-register').value.trim();  
        const email = document.getElementById('email-register').value.trim();  
        const password = document.getElementById('password-register').value;  
        const confirmPassword = document.getElementById('confirmPassword').value;  

        if (!username || !email || !password || !confirmPassword) {  
            alert('Por favor, completa todos los campos.');  
            return;  
        }  

        if (password !== confirmPassword) {  
            alert('Las contraseñas no coinciden.');  
            return;  
        }  

        try {  
            const response = await fetch('/api/auth/register', {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json',  
                },  
                body: JSON.stringify({ username, email, password }), // Solo se incluye username, email y password  
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

    // Inicio de sesión  
    loginForm.addEventListener('submit', async (event) => {  
        event.preventDefault();  

        const email = document.getElementById('user-login').value.trim();  
        const password = document.getElementById('password-login').value;  

        if (!email || !password) {  
            alert('Por favor, completa ambos campos.');  
            return;  
        }  

        try {  
            const response = await fetch('/api/auth/login', {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json',  
                },  
                body: JSON.stringify({ email: email.toLowerCase(), password }), // Cambié aquí para hacer insensible a mayúsculas  
            });  

            if (!response.ok) {  
                const errorData = await response.json();  
                document.querySelector('.error').classList.remove('escondido');  
                document.querySelector('.error').textContent = errorData.message || 'Error al iniciar sesión';  
                return;  
            }  

            const data = await response.json();  
            // Redirigir según el rol  
            if (data.role === 'admin') {  
                window.location.href = '/admin';  
            } else {  
                window.location.href = 'view/dahsboard/index.html';  
            }  

        } catch (error) {  
            console.error('Error en la solicitud de inicio de sesión:', error);  
            document.querySelector('.error').classList.remove('escondido');  
            document.querySelector('.error').textContent = 'Ocurrió un error al intentar iniciar sesión. Intenta de nuevo más tarde.';  
        }  
    });  
});