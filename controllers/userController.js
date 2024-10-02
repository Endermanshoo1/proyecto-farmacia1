const User = require('../models/User'); 

const getUser = async (req, res) => {  
    try {    
        const user = await User.findById(req.userId).select('-password'); // Excluir la contraseña de la respuesta  
        if (!user) {  
            return res.status(404).json({ message: 'Usuario no encontrado' });  
        }  
        res.status(200).json(user);  
    } catch (err) {  
        console.error('Error al obtener usuario:', err); // Añadido para ver el error en consola  
        res.status(500).json({ message: 'Error de servidor' });  
    }  
};    

const updateUser = async (req, res) => {  
    const userId = req.params.id; // Obtener el ID del usuario desde los parámetros  
    try {  
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });  
        if (!updatedUser) {  
            return res.status(404).json({ message: 'User not found' }); // Manejo del caso donde el usuario no existe  
        }  
        res.status(200).json(updatedUser);  
    } catch (err) {  
        console.error('Error al actualizar usuario:', err);  
        res.status(500).json({ message: 'Server error' });  
    }  
};  

const deleteUser = async (req, res) => {  
    const userId = req.params.id; // Obtener el ID del usuario desde los parámetros  
    try {  
        const result = await User.findByIdAndDelete(userId);  
        if (!result) {  
            return res.status(404).json({ message: 'User not found' }); // Manejo del caso donde el usuario no existe  
        }  
        res.status(200).json({ message: 'User deleted successfully' });  
    } catch (err) {  
        console.error('Error al eliminar usuario:', err);  
        res.status(500).json({ message: 'Server error' });  
    }  
};

const getAllUsers = async (req, res) => {  
    try {  
        const users = await User.find(); // Obtiene todos los usuarios  
        res.status(200).json(users);  
    } catch (err) {  
        console.error('Error al obtener todos los usuarios:', err); // Añadido para ver el error en consola  
        res.status(500).json({ message: 'Server error' });  
    }  
};  

module.exports = { getAllUsers, getUser, updateUser, deleteUser };  