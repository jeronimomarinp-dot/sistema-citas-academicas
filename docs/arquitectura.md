# Arquitectura del Proyecto

## Backend

El backend utiliza una arquitectura modular basada en el patrón MVC, complementada con una capa de Services para separar la lógica de negocio.

Estructura principal:

- Controllers
- Services
- Models
- Routes
- Middleware
- Config

### Controllers

Los Controllers reciben las solicitudes HTTP, validan los datos necesarios y coordinan la ejecución de los Services.

Módulos principales:

- Autenticación
- Citas
- Disponibilidad
- Google Calendar
- Áreas
- Materiales

### Services

Los Services contienen la lógica de negocio de los diferentes módulos.

Actualmente se utilizan Services para separar la lógica de negocio de los Controllers.

Entre ellos:

- citas.service.js
- disponibilidad.service.js
- google-calendar.service.js
- otros Services del proyecto

### Models

Los Models se encargan de la comunicación con la base de datos MySQL.

Los Models contienen las consultas SQL y las operaciones necesarias para:

- Usuarios
- Citas
- Disponibilidad
- Áreas
- Materiales
- Tokens de Google Calendar

### Routes

Las Routes definen los endpoints de la API y conectan las solicitudes HTTP con los Controllers correspondientes.

Se utilizan rutas para:

- Autenticación
- Citas
- Disponibilidad
- Áreas
- Materiales
- Google Calendar

### Middleware

Se utilizan Middlewares para controlar el acceso a los recursos protegidos.

Principales Middlewares:

- auth.middleware.js
- roles.middleware.js

`auth.middleware.js` verifica el JWT recibido en la petición y almacena la información del usuario autenticado en:

```js
req.usuario

### tokens

El token contiene actualmente:

id del usuario
rol del usuario

roles.middleware.js utiliza esta información para comprobar que el usuario tenga el rol necesario para acceder a cada endpoint.

### Base de datos

El proyecto utiliza MySQL como sistema de gestión de base de datos.

La conexión se centraliza mediante:

backend/src/config/db.js

###Autenticación

La autenticación utiliza JWT.

El token se genera durante el inicio de sesión y contiene:

{
    id: usuario.id_usuario,
    rol: usuario.rol
}

El token tiene una duración de 8 horas.

Los endpoints protegidos utilizan auth.middleware.js para verificar el token.

Integración con Google Calendar

El sistema cuenta con integración funcional con Google Calendar.

La integración utiliza OAuth 2.0 mediante la librería googleapis.

El flujo implementado permite:

Generar la URL de autorización.
Autorizar la cuenta de Google del coordinador.
Recibir el callback de Google.
Obtener los tokens de acceso.
Guardar los tokens en MySQL.
Recuperar los tokens posteriormente.
Probar la conexión con Google Calendar.
Crear eventos en el calendario del coordinador.

Los archivos principales relacionados con esta integración son:

google-calendar.js
google-calendar.controller.js
google-calendar.service.js
google-calendar.model.js
google-calendar.routes.js

### Gestión de citas

El módulo de citas integra:

Disponibilidad del coordinador.
Validación de horarios.
Duración de las citas.
Verificación de horas ocupadas.
Creación de citas.
Aceptación o rechazo de citas.
Validación de permisos del coordinador.
Integración con Google Calendar.

Cuando una cita es aceptada:

Se verifica que la cita pertenezca al coordinador autenticado.
Se obtiene la disponibilidad correspondiente.
Se determina la duración de la cita.
Se construyen las fechas de inicio y finalización.
Se crea el evento en Google Calendar.
Si la creación es exitosa, la cita pasa a estado aceptada.

###Frontend

El frontend utiliza JavaScript modular.

Estructura principal:

frontend/
└── assets/
    └── js/

Entre los módulos principales se encuentran:
api.js
auth.js
login.js
register.js
disponibilidad.js
dashboard.*
módulos relacionados con citas
módulos relacionados con materiales

### Comunicación Frontend ↔ Backend

Toda comunicación HTTP del frontend con el backend se centraliza mediante:

assets/js/api.js

No se utiliza fetch() directamente desde los diferentes módulos del frontend.

Esto permite centralizar:

Peticiones HTTP.
Manejo del token JWT.
Autenticación.
Manejo de respuestas.
Comunicación con la API.

### Estado actual

El backend se encuentra estable.

El frontend se encuentra estable.

Los módulos principales de autenticación, disponibilidad, agendamiento y Google Calendar se encuentran implementados y probados.

La integración:

Disponibilidad → Agendamiento → Cita → Google Calendar

se encuentra implementada y probada correctamente.