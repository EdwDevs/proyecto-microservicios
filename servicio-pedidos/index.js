/**
 * Microservicio de Pedidos
 * Gestiona el CRUD de los pedidos, que representan la relación
 * entre un usuario y un producto comprado.
 */

// Dependencias
const express = require('express');
const cors = require('cors');

// Configuración de la aplicación Express
const app = express();
app.use(cors());
app.use(express.json()); // Middleware para parsear el body de las peticiones a JSON

const PORT = 3001;

// Simulación de base de datos en memoria.
let pedidos = [
    { id: 101, usuarioId: 1, productoId: 10, cantidad: 1, precioTotal: 1200.50, fechaCompra: "2025-09-20" },
    { id: 102, usuarioId: 1, productoId: 30, cantidad: 1, precioTotal: 75.80, fechaCompra: "2025-09-18" },
    { id: 201, usuarioId: 2, productoId: 20, cantidad: 2, precioTotal: 50.00, fechaCompra: "2025-09-19" }
];

// =============================================
//         Endpoints de la API de Pedidos
// =============================================

// [GET] /usuarios/:id/pedidos - Obtiene los pedidos de un usuario específico
app.get('/usuarios/:id/pedidos', (req, res) => {
    const userId = parseInt(req.params.id);
    const pedidosUsuario = pedidos.filter(p => p.usuarioId === userId);
    res.json(pedidosUsuario);
});

// [POST] /pedidos - Crea un nuevo pedido
app.post('/pedidos', (req, res) => {
    // Lógica simple para generar un nuevo ID autoincremental
    const maxId = pedidos.reduce((max, pedido) => (pedido.id > max ? pedido.id : max), 0);
    
    const nuevoPedido = {
        id: maxId + 1,
        usuarioId: parseInt(req.body.usuarioId),
        productoId: parseInt(req.body.productoId),
        cantidad: parseInt(req.body.cantidad),
        precioTotal: parseFloat(req.body.precioTotal),
        fechaCompra: new Date().toISOString().split('T')[0] // Fecha actual en formato YYYY-MM-DD
    };

    pedidos.push(nuevoPedido);
    console.log('Nuevo pedido creado:', nuevoPedido);
    res.status(201).json(nuevoPedido);
});

// [DELETE] /pedidos/:id - Elimina un pedido por su ID
app.delete('/pedidos/:id', (req, res) => {
    const pedidoId = parseInt(req.params.id);
    const pedidoIndex = pedidos.findIndex(p => p.id === pedidoId);

    if (pedidoIndex > -1) {
        pedidos.splice(pedidoIndex, 1);
        console.log(`Pedido con ID: ${pedidoId} eliminado.`);
        res.status(204).send(); // 204: No Content, operación exitosa
    } else {
        res.status(404).send('Pedido no encontrado para eliminar');
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servicio de Pedidos corriendo en http://localhost:${PORT}`);
});