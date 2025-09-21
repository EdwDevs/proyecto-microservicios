# Proyecto Final: Arquitectura de Microservicios

Este proyecto es una demostración práctica de una arquitectura orientada a microservicios, desarrollada como parte del curso [Nombre de tu Curso o Asignatura]. La aplicación simula un sistema de e-commerce simple con gestión de usuarios, productos y pedidos.

## 🚀 Tecnologías Utilizadas

### Backend (Microservicios)
- **Node.js:** Entorno de ejecución para JavaScript en el servidor.
- **Express.js:** Framework minimalista para la creación de las APIs REST.
- **Axios:** Cliente HTTP para la comunicación entre microservicios.
- **CORS:** Middleware para habilitar el acceso desde el frontend.

### Frontend
- **HTML5:** Estructura de la interfaz web.
- **CSS3:** Estilizado con un enfoque moderno (Flexbox, Grid, Variables CSS).
- **JavaScript (Vanilla JS):** Lógica del lado del cliente, manipulación del DOM y consumo de APIs con `fetch`.

### Herramientas de Desarrollo
- **Git y GitHub:** Para el control de versiones y la gestión del código fuente.

---

## 🏛️ Arquitectura del Sistema

El sistema está compuesto por tres microservicios independientes, cada uno con su propia responsabilidad y "base de datos" simulada en memoria:

1.  **Servicio de Usuarios (Puerto 3000):** Gestiona el CRUD completo de los usuarios y actúa como orquestador principal, componiendo datos de otros servicios para las vistas complejas.
2.  **Servicio de Pedidos (Puerto 3001):** Gestiona el CRUD de los pedidos, representando las compras que realiza un usuario. Calcula el precio total de una compra consultando al servicio de productos.
3.  **Servicio de Productos (Puerto 3002):** Gestiona el CRUD del catálogo de productos, siendo la única fuente de verdad sobre la información de un producto (nombre, precio, imagen).

La comunicación entre el frontend y los microservicios, así como entre los propios microservicios, se realiza a través de APIs REST.

---

## 🛠️ Instrucciones de Ejecución

Para poner en marcha el proyecto, es necesario ejecutar los tres microservicios y la interfaz web.

### Prerrequisitos
- Tener instalado [Node.js](https://nodejs.org/) (versión 14 o superior).

### Pasos

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/EdwDevs/proyecto-microservicios.git
    cd proyecto-microservicios
    ```

2.  **Instalar dependencias de cada microservicio:**
    Abre tres terminales separadas. En cada una, ejecuta los siguientes comandos:

    *   **Terminal 1 (Servicio de Usuarios):**
        ```bash
        cd servicio-usuarios
        npm install
        ```
    *   **Terminal 2 (Servicio de Pedidos):**
        ```bash
        cd servicio-pedidos
        npm install
        ```
    *   **Terminal 3 (Servicio de Productos):**
        ```bash
        cd servicio-productos
        npm install
        ```

3.  **Iniciar los tres servidores:**
    En cada una de las terminales, inicia el servidor correspondiente:

    *   **Terminal 1:** `node index.js` (Correrá en `http://localhost:3000`)
    *   **Terminal 2:** `node index.js` (Correrá en `http://localhost:3001`)
    *   **Terminal 3:** `node index.js` (Correrá en `http://localhost:3002`)

4.  **Abrir la interfaz web:**
    *   Navega a la carpeta `frontend-web`.
    *   Abre el archivo `index.html` directamente en tu navegador web (ej. Chrome, Firefox).

¡La aplicación debería estar completamente funcional!
