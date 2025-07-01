const { Pool } = require('pg');
const { client } = require('../db/cliente.db');
const { request, response } = require('express');

const conectiondb = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// const migrarProductos = async(req = request , res = response) =>{
//     try {
//         const query = 'select  json_agg( row_to_json(p)) from (select * from productos) p;'
//         const resultado = await conectiondb.query(query);
//         const productos = JSON.stringify(resultado.rows[0].json_agg)
        
//         console.log(JSON.parse(productos))
//         await client.connect()
//         const database = client.db('registro')
//         const collection = database.collection('productos');
//         const insertResult = await collection.insertMany(JSON.parse(productos))
//         res.status(200).json('los productos fueron migradis de manera correcta')
        
//     } catch (error) {
//         console.log(error)
//     }finally{
//         await client.close();
//         console.log('conexion cerrada')
//     }

// }


const migrarProductos = async (req, res) => {
  try {
    const { rows } = await conectiondb.query(`SELECT * FROM productos`);
    console.log(rows)
    await client.connect();
    const collection = client.db('tienda3').collection('productos');
    await collection.insertMany(rows);
    
    res.status(200).json('Los productos fueron migrados de manera correcta');
  } catch (error) {
    console.error('Error al migrar productos:', error);
    res.status(500).json('Error al migrar productos');
  } finally {
    await client.close();
    console.log('Conexión cerrada');
  }
};




// async function migrarProductos() {
//   try {
    
//     const consulta = 'select  json_agg( row_to_json(p)) from (select * from productos) p;';
//     const resultado = await conectiondb.query(consulta);
//     const productos = resultado.rows;

   
//     await client.connect();
//     const db = client.db('registro');
//     const collection = db.collection('productos');

//     if (productos.length > 0) {
//       await collection.insertMany(productos);
//       console.log(`${productos.length} productos migrados a MongoDB.`);
//     } else {
//       console.log('No se encontraron productos para migrar.');
//     }

//     return productos;
//   } catch (error) {
//     console.error('Error al migrar productos:', error);
//     throw error;
//   } finally {
//     await conectiondb.end();
//     await client.close();
//   }
// }



module.exports = {
  conectiondb,
  migrarProductos
};

