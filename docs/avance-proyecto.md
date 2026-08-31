# Sistema Agendamiento de Citas UAM

## Estado General

### Módulo 1 - Autenticación (FINALIZADO)

Funciones implementadas:

- Inicio de sesión
- Registro de estudiantes
- Recuperación de contraseña mediante correo
- Cambio de contraseña mediante token
- Protección mediante JWT
- Validación por roles
- Migración completa a api.js

Estado:

FINALIZADO


## Versión 1

### Backend

✔ Login

✔ Registro

✔ Recuperación de contraseña

✔ CRUD de áreas

✔ CRUD de usuarios

✔ CRUD de citas

✔ CRUD de disponibilidad


### Frontend

✔ Login

✔ Registro

✔ Dashboards

✔ CRUD de áreas

✔ CRUD de usuarios

✔ CRUD de disponibilidad

✔ Agendamiento

✔ Migración completa a api.js


## Integración Disponibilidad ↔ Agendamiento

Funciones implementadas:

✔ Validación de disponibilidad del coordinador

✔ Validación del día de la semana

✔ Validación del horario

✔ Validación de la duración de la cita

✔ Validación de bloques horarios

✔ Validación de horas ocupadas

✔ Bloqueo de citas en horarios no disponibles

✔ Integración entre disponibilidad y agendamiento

Pruebas realizadas:

✔ Hora válida: 08:15

✔ Hora válida: 15:00

✔ Día sin disponibilidad

✔ Hora previamente ocupada

Estado:

FINALIZADO Y PROBADO


## Gestión de Citas

Funciones implementadas:

✔ Creación de citas

✔ Consulta de citas del estudiante

✔ Consulta de citas del coordinador

✔ Cambio de estado de las citas

✔ Aceptación de citas

✔ Rechazo de citas

✔ Validación de permisos del coordinador

✔ Prevención de procesamiento repetido de una cita con el mismo estado

Estado:

FINALIZADO Y PROBADO


## Integración con Google Calendar

Funciones implementadas:

✔ Configuración de Google OAuth 2.0

✔ Autorización de Google Calendar para coordinadores

✔ Generación y validación del parámetro state

✔ Almacenamiento de tokens de Google Calendar

✔ Recuperación de tokens del coordinador

✔ Verificación de conexión con Google Calendar

✔ Obtención de la disponibilidad correspondiente a la cita

✔ Obtención de la duración de la cita

✔ Construcción de fecha y hora de inicio y finalización del evento

✔ Creación automática de eventos en Google Calendar al aceptar una cita

✔ Obtención del identificador del evento de Google Calendar

✔ Obtención del enlace del evento

✔ Validación de que el coordinador sea propietario de la cita

Pruebas realizadas:

✔ Autorización de Google Calendar

✔ Verificación de conexión

✔ Creación de evento en Google Calendar

✔ Aceptación de una cita y creación del evento

✔ Validación de coordinador autorizado

✔ Intento de modificación por un coordinador diferente

✔ Prevención de aceptación repetida

✔ Flujo completo estudiante → cita pendiente → aceptación → Google Calendar

Estado:

FINALIZADO Y PROBADO


## Arquitectura

✔ Arquitectura MVC en backend

✔ Controllers

✔ Services

✔ Models

✔ Routes

✔ Middleware

✔ JWT centralizado

✔ Validación de roles mediante middleware

✔ api.js para centralizar las peticiones HTTP del frontend

✔ Organización modular

Estado:

Frontend estable

Backend estable


## Estado actual del proyecto

Las funcionalidades principales implementadas hasta este punto han sido probadas mediante escenarios normales y escenarios de validación.

La integración entre:

Disponibilidad → Agendamiento → Gestión de citas → Google Calendar

se encuentra implementada y funcionando correctamente.


## Funcionalidades pendientes

Las siguientes funcionalidades aún no han sido implementadas:

- Notificaciones
- Chatbot
- Despliegue del sistema para acceso desde navegador y dispositivo móvil

Estas funcionalidades serán abordadas en fases posteriores.


## Refactorización y mejoras pendientes

Existen tareas técnicas de refactorización registradas en:

`backlog-tecnico.md`

Estas tareas no bloquean el funcionamiento actual del sistema y serán abordadas posteriormente.


## Próxima fase

Definir y desarrollar la siguiente funcionalidad principal pendiente del sistema, manteniendo las funcionalidades actuales estables.