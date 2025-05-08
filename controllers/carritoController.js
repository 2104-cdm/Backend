const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db/carritos.json');

function getDB() {
    try {
        return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    } catch {
        return {};
    }
}

function saveDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function getCarrito(req, res) {
    const email = req.user.email; // ✅ Ya no es undefined
    const data = getDB();
    const carrito = data[email] || [];
    res.json({ carrito });
}

function saveCarrito(req, res) {
    const email = req.user.email; // ✅ Usamos email como clave
    const data = getDB();
    data[email] = req.body.carrito || [];
    saveDB(data);
    res.json({ message: `Carrito guardado para ${email}` });
}

module.exports = { getCarrito, saveCarrito };
