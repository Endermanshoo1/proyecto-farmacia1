const jwt = require('jsonwebtoken');  

const autentificationMiddleware = (roleRequired) => {  
    return (req, res, next) => {  
        const token = req.headers['authorization']?.split(' ')[1];  

        if (!token) {  
            return res.sendStatus(403);  
        }  

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {  
            if (err) {  
                return res.sendStatus(403);  
            }  
            req.userId = user.id;   
            req.role = user.role; 

             
            if (roleRequired && req.role !== roleRequired) {  
                return res.sendStatus(403);  
            }  

            next();  
        });  
    };  
};  

module.exports = autentificationMiddleware;