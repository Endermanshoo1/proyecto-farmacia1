function verifyRole(role) {  
    return function (req, res, next) {  
        let user;  

        // Verifica si la cookie existe  
        if (!req.cookies.userSession) {  
            console.log('Cookie userSession no existe.');  
            return res.redirect('/acceso-denegado');  
        }  

        try {  
            user = JSON.parse(req.cookies.userSession);  
        } catch (error) {  
            console.log('Error al parsear la cookie:', error);  
            return res.redirect('/acceso-denegado');  
        }  
        
        console.log('Cookie userSession:', user);  
         
        if (user && user.role === role) {  
            next();  
        } else {  
            console.log('Acceso denegado. Rol requerido:', role, 'Rol del usuario:', user ? user.role : 'No definido');  
            res.redirect('/acceso-denegado');  
        }  
    }  
}  

module.exports = verifyRole;  