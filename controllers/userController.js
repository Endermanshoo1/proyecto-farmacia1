const User = require('../models/User');  
const bcrypt = require('bcryptjs');  


exports.registerUser = [ 
    async (req, res) => {  
        const errors = validationResult(req);  
        if (!errors.isEmpty()) {  
            return res.status(400).json({ errors: errors.array() });  
        }  

        const { username, email, password, role = 'user' } = req.body; // Asignar 'user' como predeterminado  

        try {  
            // Verificar si el usuario ya existe  
            const existingUser = await User.findOne({ email });  
            if (existingUser) {  
                return res.status(400).json({ message: 'El usuario ya existe' });  
            }  

            // Hash de la contraseña  
            const hashedPassword = await bcrypt.hash(password, 10);  

            // Crear nuevo usuario  
            const user = new User({  
                username,  
                email,  
                password: hashedPassword,  
                role  
            });  

            await user.save();  

            // Omitir la contraseña al enviar la respuesta  
            const userResponse = {  
                id: user._id,  
                username: user.username,  
                email: user.email,  
                role: user.role  
            };  
            res.status(201).json({ message: 'Usuario registrado exitosamente', user: userResponse });  
        } catch (error) {  
            console.error('Error al registrar el usuario:', error);  
            res.status(500).json({ message: 'Error al registrar el usuario', error });  
        }  
    }  
]; 