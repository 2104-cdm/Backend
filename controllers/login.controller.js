const { client } = require('../db/cliente.db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        await client.connect();
        const db = client.db('registro');
        const collection = db.collection('usuarios');

        const user = await collection.findOne({ email }); // <-- Corrección aquí

        if (!user) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        const isMatch = await bcrypt.compare(password, user.hashedPassword); // Aquí está bien

        if (!isMatch) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            'mi_clave_secreta',
            { expiresIn: '1h' }
        );

        res.json({ token: token, isAdmin: user.isAdmin  });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ error: 'Error al iniciar sesión' });
    } finally {
        await client.close();
    }
};

module.exports = {
    loginUser
};
