const fs = require('fs');
const path = require('path');
const carritoFilePath = path.join(__dirname, '../db/carritos.json');

// Obtener el carrito desde el archivo
function getDB() {
    try {
        return JSON.parse(fs.readFileSync(carritoFilePath, 'utf-8'));
    } catch (err) {
        return {};  // Retorna un objeto vacío si no se puede leer el archivo
    }
}

// Guardar los cambios en el archivo
function saveDB(data) {
    fs.writeFileSync(carritoFilePath, JSON.stringify(data, null, 2));
}

// Obtener el carrito de un usuario
exports.obtenerCarrito = (req, res) => {
    const email = req.user.email;  // Asegurándonos de que 'email' está en req.user
    const data = getDB();
    const carrito = data[email] || [];  // Si no hay carrito para el email, devolvemos un array vacío
    res.json({ carrito });
};

// Agregar un producto al carrito de un usuario
exports.agregarAlCarrito = (req, res) => {
    const email = req.user.email;  // Usamos el email del usuario autenticado
    const { producto } = req.body;  // El producto debe venir en el cuerpo de la solicitud

    const data = getDB();
    if (!data[email]) {
        data[email] = [];  // Si no existe el carrito, lo inicializamos
    }
    data[email].push(producto);  // Agregamos el producto al carrito del usuario

    saveDB(data);  // Guardamos los cambios en el archivo
    res.status(201).json({ message: `Producto agregado al carrito de ${email}`, carrito: data[email] });
};

// Eliminar un producto del carrito de un usuario
exports.eliminarDelCarrito = (req, res) => {
    const email = req.user.email;
    const { idProducto } = req.params;  // El id del producto a eliminar

    const data = getDB();
    if (!data[email]) {
        return res.status(404).json({ message: 'No se encontró el carrito del usuario' });
    }

    // Filtrar el carrito para eliminar el producto con el id proporcionado
    const carrito = data[email].filter(item => item.id !== parseInt(idProducto));  // Usamos parseInt en caso de que el id sea un número

    data[email] = carrito;  // Actualizamos el carrito en la base de datos

    saveDB(data);  // Guardamos los cambios
    res.json({ message: 'Producto eliminado del carrito', carrito });
};
