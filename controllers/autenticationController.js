const User = require('../models/User');  
// const bcrypt = require('bcrypt');  // Comentado para desactivar la encriptación   
const jwt = require('jsonwebtoken');  

// Función de inicio de sesión  
//login
userRouter.post('/login', async (request, response) => {
    const { email, password } = request.body

    if (!email || !password) {
        return response.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    try {
        const userSession = await user.findOne({ email })
        if (!userSession) {
            return response.status(400).json({ message: 'Usuario invalido' })
        }

        const passwordMatch = await bcrypt.compare(password, userSession.password)

        if (!passwordMatch) {
            return response.status(400).json({ message: 'Contraseña incorrecta' })
        }

        const userData = [userSession.id, userSession.pnombre, userSession.snombre, userSession.papellido, userSession.sapellido, userSession.email]

        if (userSession.tipo === 'Administrador') {
            return response.status(200).json({ message: 'Autenticacion exitosa', user: userData, tipo: 'Administrador' })
        } else if (userSession.tipo === 'Usuario') {
            return response.status(200).json({ message: 'Autenticacion exitosa', user: userData, tipo: 'Usuario' })
        } else if (userSession.tipo === 'Inactivo') {
            return response.status(400).json({ message: 'Usuario inhabilitado, contacte al administrador del sistema' })
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error)
        return response.status(500).json({ message: 'Error al iniciar sesión' })
    }
})
// Función de registro  
const register = async (req, res) => {  
    const { username, email, password } = req.body;  

    console.log('Datos de registro recibidos:', { username, email, password });  

    try {  
        // Verificar si ya existe un usuario con el mismo correo electrónico  
        const existingEmail = await User.findOne({ email });  
        if (existingEmail) {  
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });  
        }  

        // Verificar si ya existe un usuario con el mismo nombre de usuario  
        const existingUser = await User.findOne({ username });  
        if (existingUser) {  
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });  
        }  

        // Crear nuevo usuario con rol predeterminado de "user"  
        const newUser = new User({   
            username,   
            email,   
            password,   
            role: 'user' // Asignar rol por defecto   
        });  

        // Guardar el nuevo usuario  
        await newUser.save();  
        console.log('Usuario registrado con éxito:', newUser);  

        // Respuesta exitosa  
        res.status(201).json({ message: 'Usuario registrado con éxito' });  

    } catch (err) {  
        console.error('Error durante el registro:', err);  
        res.status(500).json({ message: 'Error durante el registro' });  
    }  
};   

module.exports = { login, register };  