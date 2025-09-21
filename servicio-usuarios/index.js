/**
 * Microservicio de Usuarios
 * Gestiona el CRUD de usuarios y orquesta llamadas a otros servicios
 * para componer vistas de datos completas.
 */

// Dependencias
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Configuración de la aplicación Express
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Simulación de base de datos en memoria
let usuarios = [
    { id: 1, nombreUsuario: "jperez", nombreCompleto: "Juan Pérez", email: "juan.perez@example.com", ciudad: "Bogotá" },
    { id: 2, nombreUsuario: "amartinez", nombreCompleto: "Ana Martinez", email: "ana.martinez@example.com", ciudad: "Medellín" }
];

// =============================================
//         Endpoints de la API de Usuarios
// =============================================

// [GET] /usuarios - Obtiene todos los usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// [GET] /usuarios/:id - Obtiene un usuario por su ID
app.get('/usuarios/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === userId);
    
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

// [GET] /usuarios/:id/perfil-completo - Orquesta datos de usuario, pedidos y productos
app.get('/usuarios/:id/perfil-completo', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const usuario = usuarios.find(u => u.id === userId);

        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }

        // 1. Obtener los pedidos del usuario desde el Servicio de Pedidos
        const respuestaPedidos = await axios.get(`http://localhost:3001/usuarios/${userId}/pedidos`);
        const pedidos = respuestaPedidos.data;

        // 2. Para cada pedido, obtener la información completa del producto
        // Se utiliza Promise.all para ejecutar las llamadas a la API de productos en paralelo
        const pedidosConDetallesDeProducto = await Promise.all(
            pedidos.map(async (pedido) => {
                // Llamada al Servicio de Productos
                const respuestaProducto = await axios.get(`http://localhost:3002/productos/${pedido.productoId}`);
                
                // Combinar la información del pedido con la del producto
                return {
                    ...pedido,
                    producto: respuestaProducto.data // Anidar el objeto del producto
                };
            })
        );

        // 3. Construir la respuesta final
        const perfilCompleto = {
            ...usuario,
            pedidos: pedidosConDetallesDeProducto
        };

        res.json(perfilCompleto);

    } catch (error) {
        console.error("Error al orquestar el perfil completo:", error.message);
        res.status(500).send('Error al obtener el perfil completo del usuario');
    }
});

// [POST] /usuarios - Crea un nuevo usuario
app.post('/usuarios', (req, res) => {
    const maxId = usuarios.reduce((max, user) => (user.id > max ? user.id : max), 0);
    
    const nuevoUsuario = {
        id: maxId + 1,
        nombreUsuario: req.body.nombreUsuario,
        nombreCompleto: req.body.nombreCompleto,
        email: req.body.email,
        ciudad: req.body.ciudad
    };

    usuarios.push(nuevoUsuario);
    console.log('Usuario creado:', nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// [PUT] /usuarios/:id - Actualiza un usuario existente
app.put('/usuarios/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = usuarios.findIndex(u => u.id === userId);

    if (userIndex > -1) {
        const usuarioActualizado = { ...usuarios[userIndex], ...req.body };
        usuarios[userIndex] = usuarioActualizado;
        
        console.log('Usuario actualizado:', usuarioActualizado);
        res.json(usuarioActualizado);
    } else {
        res.status(404).send('Usuario no encontrado para actualizar');
    }
});

// [DELETE] /usuarios/:id - Elimina un usuario por su ID
app.delete('/usuarios/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = usuarios.findIndex(u => u.id === userId);

    if (userIndex > -1) {
        usuarios.splice(userIndex, 1);
        console.log(`Usuario con ID: ${userId} eliminado.`);
        res.status(204).send();
    } else {
        res.status(404).send('Usuario no encontrado para eliminar');
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servicio de Usuarios corriendo en http://localhost:${PORT}`);
});