const {  client } = require('../db/cliente.db');







async function obtenerProductos(req, res) {
  try {
     await client.connect();
        const db = client.db('registro');
        const collection = db.collection('productos');


    const lista = await collection.find({}).toArray();

    res.json(lista);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos' });
  } finally {
    await client.close();
  }
}



module.exports = {
   obtenerProductos
}





