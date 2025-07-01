// controllers/productos.controller.js
const { conectiondb } = require('../db/cliente.db');
const { conectiondb: pool } = require('../db/cliente.db');



   const importarProductos = async (req, res) => {
    const productos = req.body; 

    if (!Array.isArray(productos)) {
        return res.status(400).json({ error: 'Se esperaba un array de productos' });
    }

    try {
        for (const producto of productos) {
            const { id, nombre, imagen } = producto;

            if (!id || !nombre) {
                console.warn(`Producto inválido: ${JSON.stringify(producto)}`);
                continue; 
            }

            const query = `
                SELECT agregar_productos($1, $2, $3) AS id;
            `;
            const values = [id, nombre, imagen || null];

            await pool.query(query, values);
            console.log(producto)
        }

        res.status(200).json({ mensaje: 'Productos importados correctamente' });
    } catch (error) {
        console.error('Error al importar productos:', error);
        res.status(500).json({ error: 'Error al importar productos' });
    }
};

module.exports = importarProductos;
