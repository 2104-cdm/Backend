const fs = require('fs');
const path = require('path');
const ventasFilePath = path.join(__dirname, '../db/ventas.json');

// Obtener todas las ventas
exports.obtenerVentas = (req, res) => {
    fs.readFile(ventasFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer las ventas' });
        }
        const ventas = JSON.parse(data);
        res.json(ventas);
    });
};

// Registrar una nueva venta
exports.registrarVenta = (req, res) => {
    console.log('[ventasController] registrarVenta → body:', req.body);
    const { productos, total } = req.body;
  
    const nuevaVenta = { id: Date.now(), productos, total, despachado: false, fecha: new Date() };
    console.log('[ventasController] Nueva venta:', nuevaVenta);
  
    fs.readFile(ventasFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('[ventasController] Error leyendo ventas.json:', err);
        return res.status(500).json({ message: 'Error al leer las ventas' });
      }
      let ventas;
      try {
        ventas = JSON.parse(data);
      } catch(parseErr) {
        console.error('[ventasController] JSON inválido en ventas.json:', parseErr);
        return res.status(500).json({ message: 'Formato de ventas inválido' });
      }
      ventas.push(nuevaVenta);
      fs.writeFile(ventasFilePath, JSON.stringify(ventas, null, 2), (err) => {
        if (err) {
          console.error('[ventasController] Error escribiendo ventas.json:', err);
          return res.status(500).json({ message: 'Error al registrar la venta' });
        }
        console.log('[ventasController] Venta registrada con éxito');
        res.status(201).json({ message: 'Venta registrada', venta: nuevaVenta });
      });
    });
  };
  

// Despachar una venta
exports.despacharVenta = (req, res) => {
    const { idVenta } = req.params;

    fs.readFile(ventasFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer las ventas' });
        }

        let ventas = JSON.parse(data);
        const venta = ventas.find(v => v.id == idVenta);
        
        if (!venta) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        venta.despachado = true;
        venta.fechaDespacho = new Date();

        fs.writeFile(ventasFilePath, JSON.stringify(ventas, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al despachar la venta' });
            }
            res.json({ message: 'Venta despachada', venta });
        });
    });
};
