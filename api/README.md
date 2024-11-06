## CineCampus

### Tiempo de Ejecución

4 Días

### Nivel de Dificultad

★★★★☆

### Problema

CineCampus busca desarrollar una aplicación web para mejorar la experiencia de cine, permitiendo a los usuarios seleccionar películas, comprar boletos y asignar asientos de manera eficiente. La aplicación ofrecerá descuentos para usuarios con tarjeta VIP y permitirá compras en línea.

### Objetivo

Desarrollar APIs para gestionar películas, compra de boletos, asignación de asientos y descuentos VIP usando MongoDB.

### Requisitos Técnicos

- **Base de Datos:** MongoDB para datos de películas, boletos, asientos, usuarios y roles.
- **Autenticación:** Implementación segura para acceso a APIs con roles de usuario (VIP y estándar).
- **Autorización de Roles:** Restricciones de API según rol (descuentos solo para VIP).
- **Documentación:** Documentar endpoints, parámetros y respuestas de cada API.

---

### Estructura del Código

#### **Películas**

**Descripción:** Módulo para gestionar operaciones relacionadas con las películas.

**Código de Ejemplo:**

```javascript
import { Peliculas } from "./js/modules/peliculas.js";



// Obtener todas las películas disponibles
console.log(await pelicula.getAllFilmsAvailable());

// Obtener detalles de una película específica por ID
console.log(await pelicula.getAllDetailsFilms({ id: '66a412c85358b6683f5b8baf' }));
```

---

#### **Funciones**

**Descripción:** Módulo para reservas de asientos y disponibilidad de boletos.

**Código de Ejemplo:**

```javascript
// Reservar asientos para una función específica
METODO: POST
"http://localhost:5012/funciones/reservar"
BODY:
{"id": "66b275ffd541a250404781d6"
,
"asientosSeleccionados":["a1"]
  
}

//Mostrar Funciones Disponibles
METODO: GET
"http://localhost:5012/funciones"

// Encontrar boletos disponibles para una función específica
METODO: POST
"http://localhost:5012/funciones/disponibilidad"
BODY:{
  "id": "66b275ffd541a250404781d9"
}

// Cancelar reserva de asientos
METODO: POST
"http://localhost:5012/funciones/cancelar"
BODY:{"id": "66b275ffd541a250404781d6"
,
"asientosCancelar":["a1"] 
}
```

---

#### **Clientes**

**Descripción:** Módulo para gestionar información de clientes y verificar tarjetas VIP.

**Código de Ejemplo:**

```javascript
**CLIENTES**

// Verificar la validez de una tarjeta VIP para un cliente específico
METODO: POST
"http://localhost:5012/verificar-tarjeta"

"Body" : { "id": "66b27a3cd541a250404781dc", "numeroTarjeta": "1111222233334444" }
// Crear un nuevo usuario en la base de datos
METODO:POST
"http://localhost:5012/crear"

"Body":{
    "nombre": "Kelly",
    "apellido": "Lopez",
    "nickname": "kelilopz",
    "email": "kelilopz@example.com",
    "telefono": "3052288509",
    "contrasena": "kelilopz1",
    "categoria": "Administrador"
}


// Obtener detalles de un usuario específico por ID
METODO: GET
"http://localhost:5012/66b27a3cd541a250404781dc";


// Actualizar el rol de un usuario
METODO:PUT
"http://localhost:5012/actualizar-rol"

"Body":{
  "id": "66c6456eca43db1ae2b8acd5",
  "nuevoRol" : "Usuario Estándar"
}
```

---

### Documentación de las Funciones del Código

#### **Peliculas.js**

- **getAllFilmsAvailable()**

  - **Descripción:** Obtiene todas las películas disponibles.
  - **Entrada:** Ninguna
  - **Salida:** `Promise<Array<Object>>` - Array de objetos, cada uno representando una película disponible.
- **getAllDetailsFilms({id})**

  - **Descripción:** Obtiene los detalles de una película por ID.
  - **Entrada:** `id: string` - ID de la película.
  - **Salida:** `Promise<Object>` - Objeto con los detalles de la película especificada por el ID.

---

#### **Funciones.js**

- **reservarAsientos({id, asientosSeleccionados})**

  - **Descripción:** Reserva asientos para una función.
  - **Entrada:**
    - `id: string` - ID de la función.
    - `asientosSeleccionados: Array<string>` - Array de códigos de asiento.
  - **Salida:** `Promise<Object>` - Resultado de la reserva de asientos.
- **findAvailableBoletas({id})**

  - **Descripción:** Encuentra boletos disponibles para una función.
  - **Entrada:** `id: string` - ID de la función.
  - **Salida:** `Promise<Array<Object>>` - Array de objetos representando boletos disponibles.
- **cancelarReserva({id, asientosCancelar})**

  - **Descripción:** Cancela la reserva de asientos.
  - **Entrada:**
    - `id: string` - ID de la función.
    - `asientosCancelar: Array<string>` - Array de códigos de asiento.
  - **Salida:** `Promise<Object>` - Resultado de la cancelación de la reserva.

---

#### **Clientes.js**

- **findClientes()**

  - **Descripción:** Obtiene todos los clientes.
  - **Entrada:** Ninguna
  - **Salida:** `Promise<Object>` - Objeto con el estado y un array de documentos de clientes.
- **verificarTarjetaVIP({id, numeroTarjeta})**

  - **Descripción:** Verifica la validez de una tarjeta VIP.
  - **Entrada:**
    - `id: string` - ID del cliente.
    - `numeroTarjeta: string` - Número de la tarjeta VIP.
  - **Salida:** `Promise<Object>` - Objeto con el estado y el mensaje de la verificación de la tarjeta VIP.
- **crearUsuario({nombre, apellido, nickname, email, telefono, contrasena, categoria})**

  - **Descripción:** Crea un nuevo usuario en la base de datos.
  - **Entrada:**
    - `nombre: string` - Nombre del usuario.
    - `apellido: string` - Apellido del usuario.
    - `nickname: string` - Apodo del usuario.
    - `email: string` - Correo electrónico del usuario.
    - `telefono: string` - Número de teléfono del usuario.
    - `contrasena: string` - Contraseña del usuario (encriptada).
    - `categoria: string` - Categoría del usuario.
  - **Salida:** `Promise<Object>` - Objeto con el estado y el mensaje de la creación del usuario.
- **obtenerDetallesUsuario({id})**

  - **Descripción:** Obtiene la información detallada de un usuario por su ID.
  - **Entrada:** `id: string` - ID del usuario.
  - **Salida:** `Promise<Object>` - Objeto con el estado, el mensaje y los detalles del usuario.
- **actualizarRolUsuario({id, nuevoRol})**

  - **Descripción:** Permite la actualización del rol de un usuario.
  - **Entrada:**
    - `id: string` - ID del usuario.
    - `nuevoRol: string` - Nuevo rol del usuario.
  - **Salida:** `Promise<Object>` - Objeto con el estado y el mensaje de la actualización del rol del usuario.
