const jwt = require('jsonwebtoken');  

const autentificationAdmin = (req, res, next) => {  
    const token = req.cookies.token || req.headers['authorization'];  
    if (!token) {  
        return res.status(401).json({ message: "Acceso denegado" });  
    }  
    try {  
        const verified = jwt.verify(token, process.env.JWT_SECRET);  
        req.userId = verified.id; // Asegúrate de que el token tenga el id que necesitas  
        next();  
    } catch (error) {  
        return res.status(400).json({ message: "Token inválido" });  
    }  
};  

module.exports = autentificationAdmin;  