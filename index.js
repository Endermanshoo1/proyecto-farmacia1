const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path'); 
require('dotenv').config();  

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto: ${PORT}`);
});
  
//verificar la variable de entorno
//console.log("MONGO_URL:",process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL)  
    .then(() => {  
        console.log('Te has conectado a MongoDB');  
    })  
    .catch(err => console.error('Error connecting to MongoDB:', err));  


// Middleware para parsear el cuerpo de las peticiones  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Rutas  

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/register/index.html');
});

app.get('/user', (req, res) => {
    res.sendFile(__dirname + '/view/dahsboard/index.html'); 
});

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/view/admin/index.html'); 
});


