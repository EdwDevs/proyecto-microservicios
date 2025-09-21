/**
 * Microservicio de Pedidos
 * Gestiona el CRUD de los pedidos. Ahora calcula el precio total
 * consultando al Servicio de Productos.
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios'); // <-- Añadido para hacer llamadas HTTP

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

let pedidos = [
    { id: 101, usuarioId: 1, productoId: 10, cantidad: 1, precioTotal: 1200.50, fechaCompra: "2025-09-20" },
    { id: 102, usuarioId: 1, productoId: 30, cantidad: 1, precioTotal: 75.80, fechaCompra: "2025-09-18" },
    { id: 201, usuarioId: 2, productoId: 20, cantidad: 2, precioTotal: 50.00, fechaCompra: "2025-09-19" }
];

// ... (El endpoint GET /usuarios/:id/pedidos no cambia) ...
app.get('/usuarios/:id/pedidos', (req, res) => {
    const userId = parseInt(req.params.id);
    const pedidosUsuario = pedidos.filter(p => p.usuarioId === userId);
    res.json(pedidosUsuario);
});

// [POST] /pedidos - Crea un nuevo pedido 
app.post('/pedidos', async (req, res) => {
    try {
        const { usuarioId, productoId, cantidad } = req.body;

        // 1. Obtener el precio del producto desde el Servicio de Productos
        const respuestaProducto = await axios.get(`http://localhost:3002/productos/${productoId}`);
        const precioUnitario = respuestaProducto.data.precio;

        // 2. Calcular el precio total
        const precioTotal = precioUnitario * cantidad;

        // 3. Crear el nuevo pedido
        const maxId = pedidos.reduce((max, pedido) => (pedido.id > max ? pedido.id : max), 0);
        const nuevoPedido = {
            id: maxId + 1,
            usuarioId: parseInt(usuarioId),
            productoId: parseInt(productoId),
            cantidad: parseInt(cantidad),
            precioTotal: parseFloat(precioTotal.toFixed(2)), // Redondear a 2 decimales
            fechaCompra: new Date().toISOString().split('T')[0]
        };

        pedidos.push(nuevoPedido);
        console.log('Nuevo pedido creado (precio calculado):', nuevoPedido);
        res.status(201).json(nuevoPedido);

    } catch (error) {
        console.error("Error al crear el pedido:", error.message);
        res.status(500).send('Error al procesar la nueva compra.');
    }
});

// ... (El endpoint DELETE /pedidos/:id no cambia) ...
app.delete('/pedidos/:id', (req, res) => {
    const pedidoId = parseInt(req.params.id);
    const pedidoIndex = pedidos.findIndex(p => p.id === pedidoId);

    if (pedidoIndex > -1) {
        pedidos.splice(pedidoIndex, 1);
        console.log(`Pedido con ID: ${pedidoId} eliminado.`);
        res.status(204).send();
    } else {
        res.status(404).send('Pedido no encontrado para eliminar');
    }
});

app.listen(PORT, () => {
    console.log(`Servicio de Pedidos corriendo en http://localhost:${PORT}`);
});