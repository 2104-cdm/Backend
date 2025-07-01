// controllers/almacenController.js

exports.actualizarInventario = (req, res) => {
    
    console.log('Inventario actualizado con ID:', req.params.id);
    res.json({ message: 'Inventario actualizado' });
  };
  