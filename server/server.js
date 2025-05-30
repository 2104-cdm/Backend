//server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const carritoRoutes = require('../routes/carritoRoutes');
const ventasRoutes  = require('../routes/ventasRoutes');
const almacenRoutes = require('../routes/almacenRoutes');


const cors = require('cors'); // Importa el paquete CORS

require('dotenv').config();
// Importa las rutas de autenticación desde la carpeta correcta
const authRoutes = require('../routes/authRoutes');  

const app = express();
const port = 3000;

// Habilita CORS
app.use(cors()); // Permite solicitudes desde cualquier origen

// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(bodyParser.json());

// Registra las rutas
app.use('/api', authRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/ventas',  ventasRoutes);
app.use('/api/almacen', almacenRoutes);




// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
// server/server.js

  // ver paso 2
