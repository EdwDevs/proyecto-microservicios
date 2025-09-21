/**
 * Microservicio de Productos
 * Responsable de gestionar la información de los productos.
 */

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Este servicio correrá en un puerto nuevo y único.
const PORT = 3002;

// Simulación de la base de datos de productos con URLs de imagen estables.
const productos = [
    { 
        id: 10, 
        nombre: "Laptop Pro X1", 
        descripcion: "Potente laptop para profesionales y creativos.",
        // URL de Unsplash que sabemos que funciona
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800" 
    },
    { 
        id: 20, 
        nombre: "Mouse Ergonómico Silencioso", 
        descripcion: "Navegación precisa y sin clics ruidosos.",
        // URL de picsum.photos - estable y confiable
        imageUrl: "https://picsum.photos/id/5/800/600" 
    },
    { 
        id: 30, 
        nombre: "Teclado Mecánico RGB", 
        descripcion: "Experiencia de escritura superior con iluminación personalizable.",
        // URL de picsum.photos - estable y confiable
        imageUrl: "https://picsum.photos/id/1/800/600" 
    }
];

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

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servicio de Productos corriendo en http://localhost:${PORT}`);
});