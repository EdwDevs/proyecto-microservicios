// Ubicación: proyecto-microservicios/servicio-pedidos/index.js

const express = require('express');

const app = express();
const PORT = 3001; // Puerto diferente para que no choque con el otro servicio

const pedidos = [
    { id: 101, fecha: "2025-09-20", producto: "Laptop", cantidad: 1, precioTotal: 1200.50, usuarioId: 1 },
    { id: 102, fecha: "2025-09-21", producto: "Mouse", cantidad: 1, precioTotal: 25.00, usuarioId: 1 },
    { id: 201, fecha: "2025-09-19", producto: "Teclado", cantidad: 1, precioTotal: 75.80, usuarioId: 2 }
];

app.get('/usuarios/:id/pedidos', (req, res) => {
    const userId = parseInt(req.params.id);
    const pedidosUsuario = pedidos.filter(p => p.usuarioId === userId);
    res.json(pedidosUsuario);
});

app.listen(PORT, () => {
    console.log(`Servicio de Pedidos corriendo en http://localhost:${PORT}`);
});