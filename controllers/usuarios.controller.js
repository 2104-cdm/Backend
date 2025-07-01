const { client } = require('../db/cliente.db');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const data = req.body;


    try {
        const hashedPassword = bcrypt.hashSync(data.password, 8);

        await client.connect();
        console.log('conectado a mongoDB')
        const database = client.db('registro')
        const collection = database.collection('usuarios')
     
        const insertResult = await collection.insertOne({id: data.id_usuario || 0, nombre:data.nombre, email:data.email, hashedPassword })
        console.log('documento insertado:' , insertResult.insertedId);



        return res.status(201).json({
            message: 'Usuario registrado exitosamente',
           
        });

    } catch (error) {
        console.log('error al registrar usuario:', error);
        return res.status(500).json({ error: `error al registrar usuario: ${error.message}` });
    }
};

module.exports = {
    registerUser
};
