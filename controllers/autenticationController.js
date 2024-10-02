const Admin = require('../models/Admin'); 
const User = require('../models/User');  
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');  

// Función de inicio de sesión  
const login = async (req, res) => {  
    const { email, password } = req.body;  

    try {  
        // Intentar encontrar al usuario en la colección de administradores  
        let user = await Admin.findOne({ email });  

        // Si no se encuentra, intentar buscar en la colección de usuarios  
        if (!user) {  
            user = await User.findOne({ email });  
        }   
        console.log('Usuario encontrado:', user);  

        if (!user) {  
            console.log('No se encontró usuario con el email:', email);  
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });   
        }  

        // Comparar la contraseña  
        const isMatch = await bcrypt.compare(password, user.password);  
        console.log(isMatch);  
        if (!isMatch) {  
            console.log('Contraseña incorrecta para el usuario:', email);  
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });  
        }  

        // Enviar respuesta con el objeto user incluyendo el rol y demás información relevante  
        res.json({   
            message: 'Inicio de sesión exitoso',  
            user: { // Incluye el objeto user  
                id: user._id,  
                username: user.username,  
                email: user.email,  
                role: user.role   
            }   
        });  
    } catch (err) {  
        console.error('Error durante el inicio de sesión:', err);  
        res.status(500).json({ message: 'Error durante el inicio de sesión' });  
    }  
};   
    
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

        // Encriptar la contraseña antes de almacenar  
        const hashedPassword = await bcrypt.hash(password, 10);  

        // Crear nuevo usuario con rol predeterminado de "user"  
        const newUser = new User({  
            username,  
            email,  
            password: hashedPassword,   
            role: 'user'   
        });  

        // Guardar el nuevo usuario  
        await newUser.save();  
        console.log('Usuario registrado con éxito:', newUser);  

        // Respuesta exitosa, incluyendo el rol  
        res.status(201).json({   
            message: 'Usuario registrado con éxito',  
            role: newUser.role   
        });  

    } catch (err) {  
        console.error('Error durante el registro:', err);  
        res.status(500).json({ message: 'Error durante el registro' });  
    }  
};  

module.exports = { login, register };  