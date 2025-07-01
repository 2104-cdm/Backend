// const { conectiondb, client } = require("../db/cliente.db");
// const pool = conectiondb

const { client } = require("../db/cliente.db");



// const mandarVentasBD = async (req, res) => {
//   const { productos, total, despachado, fecha, fechaDespacho } = req.body;
//     console.log('Datos recibidos para guardar en BD:', req.body);

//   const client = await pool.connect();

//   try {
//     await client.query('BEGIN');

//     // 1. Insertar la factura
//     const insertFacturaQuery = `
//       INSERT INTO facturas (total, despachado, fecha, fecha_despacho)
//       VALUES ($1, $2, $3, $4)
//       RETURNING id
//     `;
//     const result = await client.query(insertFacturaQuery, [total, despachado, fecha, fechaDespacho]);
//     const facturaId = result.rows[0].id;

//     // 2. Insertar cada producto en factura_detalles
//     const insertDetalleQuery = `
//       INSERT INTO factura_detalles (factura_id, producto_id, nombre, precio, cantidad, imagen)
//       VALUES ($1, $2, $3, $4, $5, $6)
//     `;

//     for (const producto of productos) {
//       await client.query(insertDetalleQuery, [
//         facturaId,
//         producto.id,
//         producto.nombre,
//         producto.precio,
//         producto.cantidad,
//         producto.imagen
//       ]);
//     }

//     await client.query('COMMIT');

//     res.status(201).json({ mensaje: 'Factura y productos guardados con éxito', facturaId });
//   } catch (error) {
//     await client.query('ROLLBACK');
//     console.error('Error al insertar en la base de datos:', error);
//     res.status(500).json({ error: 'Error al guardar la factura' });
//   } finally {
//     client.release();
//   }
// };

 // Asegúrate de tener este archivo mongo.js bien configurado

const mandarVentasBD = async (req, res) => {
  const { productos, total, despachado, fecha, fechaDespacho } = req.body;

  try {
    await client.connect();
        const db = client.db('registro');
        const collection = db.collection('Facturas');

    const nuevaVenta = {
      total,
      despachado,
      fecha,
      fechaDespacho,
      productos,
      createdAt: new Date()
    };

    const result = await collection.insertOne(nuevaVenta);

    res.status(201).json({
      mensaje: 'Venta guardada con éxito en MongoDB',
      ventaId: result.insertedId
    });

  } catch (error) {
    console.error('Error al guardar la venta en MongoDB:', error);
    res.status(500).json({ error: 'Error al guardar la venta' });
  }
};




module.exports ={
    mandarVentasBD
}