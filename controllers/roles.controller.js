
const { client } = require('../db/cliente.db');





const Roles = async (req, res) => {
    // const { isAdmin } = req.query;

    try {
        await client.connect();
        const db = client.db('registro');
        const collection = db.collection('usuarios');
        
        const user = await collection.findOne({}); 
        console.log(user)
        
        if (!user) {
            return res.status(400).json({ message: 'hubo un problema al intentar verificar su rol' });
        }

        else{
            return res.json(  user  );
        }
       
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    } 
    // finally {
    //     await client.close();
    // }
};

module.exports = {
  Roles
};
