const Admin = require('../models/Admin');   
const User = require('../models/User');  
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');  
const nodemailer = require('nodemailer');

// Función para generar un token JWT  
const generateToken = (user) => {  
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });  
};  

// Configuración del transportador de correo  
const transporter = nodemailer.createTransport({  
    service: 'gmail', // Puedes cambiarlo por otro servicio  
    auth: {  
        user: process.env.EMAIL_USER, // Tu correo electrónico  
        pass: process.env.EMAIL_PASS // Tu contraseña de correo electrónico o App Password  
    }  
});  

// Función para enviar correo de confirmación  
const sendConfirmationEmail = async (userEmail, username) => {  
    const mailOptions = {  
        from: process.env.EMAIL_USER,  
        to: userEmail,  
        subject: 'Registro Exitoso',  
        text: `¡Hola ${username}!\n\nGracias por registrarte. Tu registro ha sido exitoso.\n\n¡Bienvenido!`,  
        html: `<h3>¡Hola ${username}!</h3><p>Gracias por registrarte. Tu registro ha sido exitoso.</p><p>¡Bienvenido!</p>`  
    };  

    try {  
        await transporter.sendMail(mailOptions);  
        console.log('Correo de confirmación enviado');  
    } catch (err) {  
        console.error('Error al enviar el correo:', err);  
    }  
};  

// Función de inicio de sesión  
const login = async (req, res) => {  
    const { email, password } = req.body;  

    try {  
        let user = await Admin.findOne({ email });  

        if (!user) {  
            user = await User.findOne({ email });  
        }   

        if (!user) {  
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });   
        }  

        const isMatch = await bcrypt.compare(password, user.password);  
        if (!isMatch) {  
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });  
        }  

        const token = generateToken(user);  
        
        // Establecer la cookie `userSession` con los datos del usuario y una expiración de 10 minutos (600000 milisegundos)  
        res.cookie('userSession', JSON.stringify({  
            id: user._id,  
            username: user.username,  
            email: user.email,  
            role: user.role  
        }), { httpOnly: true, maxAge: 600000 }); // Aquí se establece la expiración de la cookie a 10 minutos  
    
        res.json({  
            message: 'Inicio de sesión exitoso',  
            token,  
            user: {  
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

    try {  
        const existingEmail = await User.findOne({ email });  
        if (existingEmail) {  
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });  
        }  

        const existingUser = await User.findOne({ username });  
        if (existingUser) {  
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });  
        }  

        const hashedPassword = await bcrypt.hash(password, 10);  

        const newUser = new User({  
            username,  
            email,  
            password: hashedPassword,   
            role: 'user'   
        });  

        await newUser.save();  
        
        // Envía el correo de confirmación  
        await sendConfirmationEmail(newUser.email, newUser.username);  

        res.status(201).json({   
            message: 'Usuario registrado con éxito',  
            role: newUser.role   
        });  

    } catch (err) {  
        console.error('Error durante el registro:', err);  
        res.status(500).json({ message: 'Error durante el registro' });  
    }  
};  

//funcion de logout
const logout = (req, res) => {  
    // Eliminar la cookie de sesión  
    res.clearCookie('userSession'); // Borrar la cookie userSession  
    res.json({ message: 'Sesión cerrada con éxito' }); // Respuesta de cierre de sesión  
};

module.exports = { login, register, logout };  