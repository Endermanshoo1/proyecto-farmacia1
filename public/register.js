const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const role = e.target.role.value;

    if (password !== confirmPassword) { 
        alert('Las contraseñas no coinciden');
        return; 
    } 

    console.log('Datos enviados en registro:', { username, password, role });

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, role })
        });

        const data = await response.json();
        console.log('Respuesta del servidor en registro:', data);

        if (response.ok) {
            window.location.href = './view/register/index.html'; // Redirige a la página de login
        } else {
            throw new Error(data.msg || 'Error al crear la cuenta');
        }
    } catch (error) {
        console.error('Error en register:', error.message);
        alert(error.message || 'Error al crear la cuenta');
    }
});


document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
  
    console.log('Datos enviados en login:', { username, password });
  
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
      console.log('Respuesta del servidor en login:', data);
  
      if (response.ok) {
        window.location.href = data.role === 'admin' ? '/admin/index.html' : '/dahsboard/index.html'; // Redirige según el rol
      } else {
        throw new Error(data.msg || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error en login:', error.message);
      alert(error.message || 'Error al iniciar sesión');
    }
  });
  