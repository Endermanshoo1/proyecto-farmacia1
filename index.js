const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path'); 
const jwt = require('jsonwebtoken'); // Añadir esta línea
require('dotenv').config();  

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto: ${PORT}`);
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.use('/public', express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URL)    
    .then(() => {  
        console.log('Te has conectado a MongoDB');   
    })  
    .catch(err => console.error('Error connecting to MongoDB:', err));  

//controladores
const userController = require('./controllers/userController')
const adminController = require('./controllers/adminController')
const authController = require('./controllers/autenticationController')

// Rutas de autenticación
app.post('/api/auth/login', authController.login);
app.post('/api/auth/register', authController.register);

// Rutas de usuario
app.get('/api/user', userController.getUser);
app.put('/api/user', userController.updateUser);
app.delete('/api/user', userController.deleteUser);

// Rutas de administrador
app.get('/api/admin', adminController.getAdmin);
app.put('/api/admin', adminController.updateAdmin);
app.delete('/api/admin', adminController.deleteAdmin);

// Rutas de frontend
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/register/index.html');
});

app.get('/user', (req, res) => {  
    res.sendFile(path.join(__dirname, 'view/dahsboard/index.html'));    
}); 

app.get('/user/bebes', (req, res) => {  
    res.sendFile(path.join(__dirname, 'view/productos/bebes/index.html'));    
}); 

app.get('/user/belleza', (req, res) => {  
    res.sendFile(path.join(__dirname, 'view/productos/belleza/index.html'));    
}); 

app.get('/user/comestibles', (req, res) => {  
    res.sendFile(path.join(__dirname, 'view/productos/comestibles/index.html'));    
}); 

app.get('/user/cuidado-personal', (req, res) => {  
    res.sendFile(path.join(__dirname, 'view/productos/cuidadopersonal/index.html'));    
}); 

app.get('/user/farmacia', (req, res) => {  
    res.sendFile(path.join(__dirname, 'view/productos/farmacia/index.html'));    
}); 

app.get('/user/hogar', (req, res) => {  
    res.sendFile(path.join(__dirname, 'view/productos/hogar/index.html'));    
}); 

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/view/admin/index.html'); 
});

//rutas de css y js 
//registro
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css'))); 
//dashboard
app.use('/css', express.static(path.join(__dirname, 'css/Dasboard.css'))); 
app.use('/js', express.static(path.join(__dirname, 'js/Dasboard.js'))); 
app.use('/js', express.static(path.join(__dirname, 'js/cartService.js'))); 


