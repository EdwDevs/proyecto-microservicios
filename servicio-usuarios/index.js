// Ubicación: proyecto-microservicios/servicio-usuarios/index.js

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

const usuarios = [
    { id: 1, nombreUsuario: "jperez", nombreCompleto: "Juan Pérez", email: "juan.perez@example.com", ciudad: "Bogotá" },
    { id: 2, nombreUsuario: "amartinez", nombreCompleto: "Ana Martinez", email: "ana.martinez@example.com", ciudad: "Medellín" }
];

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === userId);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

app.get('/usuarios/:id/perfil-completo', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const usuario = usuarios.find(u => u.id === userId);

        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Aquí ocurre la magia: este servicio llama al otro
        const respuestaPedidos = await axios.get(`http://localhost:3001/usuarios/${userId}/pedidos`);
        const pedidos = respuestaPedidos.data;

        const perfilCompleto = {
            ...usuario,
            pedidos: pedidos
        };

        res.json(perfilCompleto);

    } catch (error) {
        console.error("Error al comunicar con el servicio de pedidos:", error.message);
        res.status(500).send('Error al obtener el perfil completo del usuario');
    }
});

app.listen(PORT, () => {
    console.log(`Servicio de Usuarios corriendo en http://localhost:${PORT}`);
});