//server/server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const carritoRoutes = require('../routes/carritoRoutes');
const ventasRoutes  = require('../routes/ventasRoutes');
const almacenRoutes = require('../routes/almacenRoutes');
const cors = require('cors'); // Importa el paquete CORS
const { conectiondb } = require('../db/cliente.db');

// Importa las rutas de autenticación desde la carpeta correcta
const authRoutes = require('../routes/authRoutes');  
const { mostrarProducto } = require('../controllers/mostrarProducto.controller');
const mandarVentasRoutes = require('../routes/mandarVentas.routes');

const app = express();
const port = 3000;

// Habilita CORS
app.use(cors()); // Permite solicitudes desde cualquier origen

// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(bodyParser.json());

// Registra las rutas
app.use('/api/bd', mandarVentasRoutes);

app.use('/api/carrito', carritoRoutes, );
app.use('/api/ventas', ventasRoutes);

app.use('/api/almacen', almacenRoutes);
app.use('/api/usuarios' , require('../routes/usuarios.routes') )
app.use('/api/login' , require('../routes/login.routes') )
app.use('/api/importar' , require('../routes/listaProducto.routes') )
app.use('/api/migrar', require('../routes/migrarProducto.routes'));
app.use('/api/productos', require('../routes/mostrarProducto.routes'))
app.use('/api/roles', require('../routes/roles.routes'))


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
