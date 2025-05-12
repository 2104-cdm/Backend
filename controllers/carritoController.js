const fs = require('fs');
// fs: módulo nativo de Node.js que permite interactuar con el sistema de archivos (leer, escribir, etc.)

const path = require('path');
// path: módulo nativo de Node.js para trabajar con rutas de archivos y directorios de forma independiente del sistema operativo

const carritoFilePath = path.join(__dirname, '../db/carritos.json');
// carritoFilePath: construye la ruta absoluta al archivo 'carritos.json' dentro de la carpeta 'db'
// __dirname: variable que indica la ruta del directorio donde se encuentra este archivo
// path.join: método que une segmentos de ruta de manera segura según el sistema operativo

// Obtener el carrito desde el archivo
function getDB() { // esto garantiza que el programa siga funcionando aun que el archivo no exista
    // getDB: función para leer y parsear el archivo JSON que contiene los carritos
    try {
        return JSON.parse(
            fs.readFileSync(carritoFilePath, 'utf-8')
        );
        // fs.readFileSync: lee el archivo de forma síncrona
        // 'utf-8': codificación para leer el contenido como texto
        // JSON.parse: convierte la cadena JSON en un objeto JavaScript
    } catch (err) {
        return {};
        // Si ocurre un error al leer o parsear el archivo, devolvemos un objeto vacío
        // Evita que la aplicación falle si el archivo no existe o está corrupto
    }
}

// Guardar los cambios en el archivo
function saveDB(data) {
    fs.writeFileSync(
        carritoFilePath,
        JSON.stringify(data, null, 2)
    );
    // fs.writeFileSync: escribe en el archivo de forma síncrona
    // JSON.stringify: convierte el objeto JavaScript en texto JSON
    // null, 2: parámetros para formatear con identación de 2 espacios, facilitando la lectura manual
}

// Obtener el carrito de un usuario
exports.obtenerCarrito = (req, res) => {
    const email = req.user.email;
    // req.user.email: se asume que el middleware de autenticación ha agregado el objeto 'user' al request
    // email identifica de forma única al usuario

    const data = getDB();
    // Recupera todos los carritos almacenados en el JSON

    const carrito = data[email] || [];
    // data[email]: carrito específico del usuario
    // || []: si no existe, devuelve un array vacío

    res.json({ carrito });
    // Responde al cliente con un objeto JSON que contiene el carrito
};

// Agregar un producto al carrito de un usuario
exports.agregarAlCarrito = (req, res) => {
    const email = req.user.email;
    // Obtener el email del usuario autenticado

    const { producto } = req.body;
    // Desestructuración para extraer 'producto' enviado en el cuerpo de la petición

    const data = getDB();
    // Cargar los datos actuales del archivo

    if (!data[email]) {
        data[email] = [];
        // Si no existe un carrito para este email, inicializar un array vacío
    }

    data[email].push(producto);
    // Agregar el producto al array del carrito del usuario

    saveDB(data);
    // Guardar el nuevo estado de los carritos en el archivo JSON

    res.status(201).json({ 
        message: `Producto agregado al carrito de ${email}`,
        carrito: data[email]
    });
    // Responder con código 201 (creado) y mensaje de confirmación junto con el carrito actualizado
};

// Eliminar un producto del carrito de un usuario
exports.eliminarDelCarrito = (req, res) => {
    const email = req.user.email;
    // Email del usuario autenticado

    const { idProducto } = req.params;
    // idProducto: parámetro de ruta que indica el identificador del producto a eliminar

    const data = getDB();
    // Cargar los datos actuales

    if (!data[email]) {
        return res.status(404).json({
            message: 'No se encontró el carrito del usuario'
        });
        // Si el usuario no tiene carrito, responder con error 404 (no encontrado)
    }

    // Filtrar el carrito para eliminar el producto con el id proporcionado
    const carrito = data[email].filter(item => item.id !== parseInt(idProducto));
    // parseInt: convertir el id de string a número para comparación

    data[email] = carrito;
    // Actualizar el carrito en la "base de datos" (archivo JSON)

    saveDB(data);
    // Guardar los cambios en el archivo

    res.json({ 
        message: 'Producto eliminado del carrito',
        carrito
    });
    // Responder con el carrito actualizado después de la eliminación
};
