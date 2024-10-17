const Admin = require('../models/Admin');  
const bcrypt = require('bcryptjs');  

// Función para añadir administrador  
const addAdmin = async (req, res) => {  
    const { username, email, password } = req.body;  

    console.log('Datos para añadir administrador recibidos:', { username, email, password });  

    try {  
        // Validaciones de entrada  
        if (!username || !email || !password) {  
            return res.status(400).json({ message: 'Todos los campos son requeridos.' });  
        }  

        // Verificar si ya existe un administrador con el mismo correo electrónico  
        const existingEmail = await Admin.findOne({ email });  
        if (existingEmail) {  
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });  
        }  

        // Verificar si ya existe un administrador con el mismo nombre de usuario  
        const existingUser = await Admin.findOne({ username });  
        if (existingUser) {  
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });  
        }  

        // Encriptar la contraseña antes de almacenar  
        const hashedPassword = await bcrypt.hash(password, 10);  

        // Crear nuevo administrador con rol "admin"  
        const newAdmin = new Admin({  
            username,  
            email,  
            password: hashedPassword,  
            role: 'admin' // Asignar rol predeterminado de "admin"  
        });  

        // Guardar el nuevo administrador  
        await newAdmin.save();  
        console.log('Administrador añadido con éxito:', newAdmin);  

        // Respuesta exitosa, incluyendo el rol  
        res.status(201).json({  
            message: 'Administrador añadido con éxito',  
            role: newAdmin.role // Devolver el rol del nuevo administrador  
        });  

    } catch (err) {  
        console.error('Error al añadir administrador:', err);  
        res.status(500).json({ message: 'Error al añadir administrador' });  
    }  
};  

// Función para obtener un administrador por ID  
const getAdmin = async (req, res) => {  
    try {  
        const admin = await Admin.findById(req.userId); 
        if (!admin) {  
            return res.status(404).json({ message: 'Administrador no encontrado' });  
        }  
        res.status(200).json(admin);  
    } catch (err) {  
        console.error('Error al obtener administrador:', err);  
        res.status(500).json({ message: 'Error de servidor' });  
    }  
};  

// Función para actualizar un administrador  
const updateAdmin = async (req, res) => {  
    const { username, email, password } = req.body;  

    try {  
        // Validaciones de entrada  
        if (!username && !email && !password) {  
            return res.status(400).json({ message: 'Al menos uno de los campos debe ser actualizado.' });  
        }  

        // Verificar si el correo electrónico ya existe (opcional, según tu lógica)  
        if (email) {  
            const existingEmail = await Admin.findOne({ email });  
            if (existingEmail) {  
                return res.status(400).json({ message: 'El correo electrónico ya está en uso' });  
            }  
        }  

        // Encriptar la nueva contraseña antes de almacenar  
        let updatedData = { username, email };  
        if (password) {  
            updatedData.password = await bcrypt.hash(password, 10); 
        }  

        const updatedAdmin = await Admin.findByIdAndUpdate(req.userId, updatedData, { new: true, runValidators: true });  
        if (!updatedAdmin) {  
            return res.status(404).json({ message: 'Administrador no encontrado' });  
        }  

        res.status(200).json(updatedAdmin);  
    } catch (err) {  
        console.error('Error al actualizar administrador:', err);  
        res.status(500).json({ message: 'Error de servidor' });  
    }  
};  

// Función para eliminar un administrador  
const deleteAdmin = async (req, res) => {  
    try {  
        const deletedAdmin = await Admin.findByIdAndDelete(req.userId);  
        if (!deletedAdmin) {  
            return res.status(404).json({ message: 'Administrador no encontrado' });  
        }  
        res.status(200).json({ message: 'Administrador eliminado correctamente' });  
    } catch (err) {  
        console.error('Error al eliminar administrador:', err);  
        res.status(500).json({ message: 'Error de servidor' });  
    }  
};  

module.exports = { addAdmin, getAdmin, updateAdmin, deleteAdmin };  