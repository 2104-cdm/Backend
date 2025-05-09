// controllers/almacenController.js
const fs   = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/productos.json');

function leerProductos() {
  try { return JSON.parse(fs.readFileSync(dbPath, 'utf8')); }
  catch { return []; }
}

function guardarProductos(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

exports.actualizarInventario = (req, res) => {
  const id       = req.params.id;
  const delta    = Number(req.body.cantidad);
  const productos = leerProductos();
  const p        = productos.find(x => x.id == id);
  if (!p) return res.status(404).json({ message: 'Producto no encontrado' });

  p.stock = (p.stock||0) + delta;
  if (p.stock < 0) p.stock = 0;

  guardarProductos(productos);
  res.json({ message: 'Inventario actualizado', producto: p });
};
