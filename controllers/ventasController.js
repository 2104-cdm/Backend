const fs = require('fs');
const path = require('path');
const ventasFilePath = path.join(__dirname, '../db/ventas.json');
// const { conectiondb } = require('../db/cliente.db');
// const pool = conectiondb;

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
exports.despacharVenta = (req, res) => { //nombre de la función
    const { idVenta } = req.params;// idVenta es el ID de la venta a despachar que se pasa como parámetro en la URL y se encuentra en req.params
// req.params es un objeto que contiene los parámetros de la URL por medio de los cuales se accede al idVenta el req.params sale de la ruta definida en el archivo routes.js
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


// Este archivo representa un controlador de ventas para una aplicación Node.js. El controlador 
// se encarga de gestionar operaciones relacionadas con ventas, como obtener el historial, registrar
//  nuevas ventas y actualizar el estado de una venta al momento de ser despachada. Toda la 
// información se guarda en un archivo JSON, actuando como una base de datos sencilla basada en
//  archivos.

// Desde el comienzo, se importan dos módulos de Node.js: fs, que permite trabajar con el sistema 
// de archivos, y path, que sirve para construir rutas de archivo de manera segura y multiplataforma. 
// A continuación, se define la ubicación del archivo donde se almacenan los datos de ventas: ventas.json,
//  el cual se encuentra en un subdirectorio llamado db. Esta ruta se construye dinámicamente con path.join
//  y __dirname, lo que garantiza que funcionará correctamente sin importar dónde se esté ejecutando el proyecto.

// La primera función exportada es obtenerVentas, que permite consultar todas las ventas registradas. 
// Esta función se ejecuta cuando se hace una solicitud HTTP (probablemente de tipo GET) a la ruta correspondiente.
//  Dentro de la función, se utiliza fs.readFile para leer el contenido del archivo ventas.json. Si ocurre un error 
// al leer el archivo (por ejemplo, si no existe o no se tienen permisos), se responde al cliente con un error 500 y
//  un mensaje explicativo. En caso contrario, se convierte el contenido del archivo de texto a un objeto JavaScript
//  mediante JSON.parse, y se devuelve como respuesta en formato JSON.

// La segunda función es registrarVenta, cuyo propósito es agregar una nueva venta al archivo. Esta función espera 
// que en el cuerpo de la solicitud (req.body) vengan los detalles de la venta: los productos adquiridos y el total 
// de la venta. Con esta información se crea un nuevo objeto de venta, que incluye un ID generado con Date.now(), un
//  campo despachado en falso (indicando que aún no ha sido enviada), y la fecha actual en la que se registró la venta.

// Antes de guardar esta nueva venta, el archivo ventas.json se lee nuevamente. Si la lectura falla, se notifica al 
// cliente con un error 500. Si el archivo está dañado o su contenido no es un JSON válido, el sistema captura el error
//  de análisis (parseErr) y responde también con un error indicando que el formato del archivo es inválido. Si todo está 
// en orden, se añade la nueva venta al arreglo existente de ventas, y luego se guarda nuevamente en el archivo utilizando 
// fs.writeFile. En caso de error durante la escritura, se informa al cliente. Si la operación tiene éxito, se devuelve una
//  respuesta con código 201, indicando que la venta fue creada correctamente, y se incluye el objeto de la nueva venta.

// La tercera y última función se llama despacharVenta, y sirve para marcar una venta como despachada. Esta función espera 
// recibir el ID de la venta a través de los parámetros de la URL (req.params.idVenta). Una vez recibido, se vuelve a leer 
// el archivo ventas.json. Luego, se busca la venta cuyo id coincida con el idVenta proporcionado. Si no se encuentra ninguna
//  venta con ese ID, se responde con un código 404 y un mensaje indicando que la venta no existe. Si sí se encuentra, se actualiza
//  su estado, marcando despachado como true y agregando la fecha de despacho con new Date().

// Finalmente, se sobrescribe el archivo de ventas con el nuevo contenido actualizado. Si la escritura falla, se informa al cliente
//  mediante un error 500. En caso contrario, se devuelve un mensaje de éxito junto con la información actualizada de la venta despachada.

// ✅ Resumen general
// Este controlador actúa como una interfaz entre las rutas de ventas y el archivo JSON que actúa como base de datos. Permite realizar 
// operaciones típicas de un sistema de ventas pequeño: consultar registros, agregar nuevas ventas y actualizar su estado. Es una solución
//  simple pero funcional para aplicaciones pequeñas o educativas, donde no se requiere aún una base de datos completa. Además, con los mensajes
//  en consola (console.log), se facilita la depuración y seguimiento del comportamiento del sistema durante el desarrollo.