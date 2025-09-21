/**
 * Microservicio de Productos
 * Gestiona el CRUD completo de la información de los productos.
 */

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Habilitar para recibir JSON en POST y PUT

const PORT = 3002;

// Simulación de la base de datos de productos.
let productos = [
    { 
        id: 10, 
        nombre: "Laptop Pro X1", 
        descripcion: "Potente laptop para profesionales y creativos.",
        precio: 1200.50,
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800" 
    },
    { 
        id: 20, 
        nombre: "Mouse Ergonómico Silencioso", 
        descripcion: "Navegación precisa y sin clics ruidosos.",
        precio: 25.00,
        imageUrl: "https://picsum.photos/id/5/800/600" 
    },
    { 
        id: 30, 
        nombre: "Teclado Mecánico RGB", 
        descripcion: "Experiencia de escritura superior con iluminación personalizable.",
        precio: 75.80, 
        imageUrl: "https://picsum.photos/id/1/800/600" 
    }
];

// =============================================
//         Endpoints de la API de Productos
// =============================================

// [GET] /productos - Obtiene la lista completa de productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// [GET] /productos/:id - Obtiene un producto por su ID
app.get('/productos/:id', (req, res) => {
    const productoId = parseInt(req.params.id);
    const producto = productos.find(p => p.id === productoId);

    if (producto) {
        res.json(producto);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// [POST] /productos - Crea un nuevo producto
app.post('/productos', (req, res) => {
    const maxId = productos.reduce((max, p) => (p.id > max ? p.id : max), 0);
    
    const nuevoProducto = {
        id: maxId + 10, // Incrementamos de 10 en 10 para evitar colisiones
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imageUrl: req.body.imageUrl
    };

    productos.push(nuevoProducto);
    console.log('Producto creado:', nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// [PUT] /productos/:id - Actualiza un producto existente
app.put('/productos/:id', (req, res) => {
    const productoId = parseInt(req.params.id);
    const productoIndex = productos.findIndex(p => p.id === productoId);

    if (productoIndex > -1) {
        const productoActualizado = { ...productos[productoIndex], ...req.body };
        productos[productoIndex] = productoActualizado;
        
        console.log('Producto actualizado:', productoActualizado);
        res.json(productoActualizado);
    } else {
        res.status(404).send('Producto no encontrado para actualizar');
    }
});

// [DELETE] /productos/:id - Elimina un producto
app.delete('/productos/:id', (req, res) => {
    const productoId = parseInt(req.params.id);
    const productoIndex = productos.findIndex(p => p.id === productoId);

    if (productoIndex > -1) {
        productos.splice(productoIndex, 1);
        console.log(`Producto con ID: ${productoId} eliminado.`);
        res.status(204).send();
    } else {
        res.status(404).send('Producto no encontrado para eliminar');
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servicio de Productos corriendo en http://localhost:${PORT}`);
});