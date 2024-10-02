const jwt = require('jsonwebtoken');  

const autentificationMiddleware = (req, res, next) => {  
    const token = req.headers['authorization']?.split(' ')[1]; // Obtén el token  

    if (!token) {  
        return res.sendStatus(403);  
    }  

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {  
        if (err) {  
            return res.sendStatus(403);  
        }  
        req.userId = user.id; // Guarda el ID del usuario, accesible en `req.userId`  
        next();  
    });  
};  

module.exports = autentificationMiddleware;