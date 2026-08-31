### `decisiones.md`

```md
# Decisiones de Arquitectura

## Decisión 1

Toda petición HTTP del frontend utilizará `api.js`.

No se utilizará `fetch()` directamente en ningún módulo.

### Motivo

- Centralizar autenticación.
- Evitar duplicación de código.
- Facilitar el mantenimiento.
- Centralizar el manejo del token JWT.
- Mantener una comunicación uniforme con el backend.

### Estado

Implementado.

---

## Decisión 2

El backend utiliza una arquitectura modular basada en MVC, complementada con una capa de Services.

La estructura se divide principalmente en:

- Controllers
- Services
- Models
- Routes
- Middleware
- Config

### Motivo

Separar las responsabilidades de cada parte del sistema y facilitar el mantenimiento y crecimiento del proyecto.

### Estado

Implementado.

---

## Decisión 3

La autenticación y autorización se manejarán mediante JWT y validación de roles.

El JWT contiene:

```js
{
    id: usuario.id_usuario,
    rol: usuario.rol
}

El auth.middleware.js verifica el token y almacena los datos del usuario autenticado en:

req.usuario

El roles.middleware.js controla el acceso dependiendo del rol.

Motivo

Centralizar la seguridad de los endpoints y evitar que cada Controller tenga que implementar nuevamente la validación de autenticación y roles.

Estado

Implementado.

### Decisión 4

La lógica de negocio de los módulos principales se mantiene separada de los Controllers mediante Services.

Motivo

Evitar que los Controllers contengan toda la lógica del sistema y facilitar futuras modificaciones.

Estado

Implementado en los módulos que actualmente utilizan Services.

### Decisión 5

La disponibilidad del coordinador será la fuente para determinar los horarios disponibles para agendar una cita.

El sistema valida:

Día de la semana.
Hora de inicio.
Hora de finalización.
Duración de la cita.
Bloques disponibles.
Horas ocupadas.
Motivo

Evitar que un estudiante pueda solicitar una cita fuera del horario configurado por el coordinador.

Estado

Implementado y probado.

### Decisión 6

Una cita solamente puede ser aceptada por el coordinador al que pertenece.

Antes de modificar el estado de una cita, el sistema verifica que:

id_coordinador de la cita
=
id del coordinador autenticado
Motivo

Evitar que un coordinador pueda modificar citas pertenecientes a otro coordinador.

Estado

Implementado y probado.

### Decisión 7

La integración con Google Calendar utiliza OAuth 2.0.

Los tokens obtenidos durante la autorización se almacenan en la tabla:

google_calendar_tokens
Motivo

Permitir que el sistema pueda acceder posteriormente al calendario autorizado por el coordinador sin solicitar nuevamente la autorización en cada operación.

Estado

Implementado y probado.

### Decisión 8

Cuando una cita es aceptada, el sistema crea automáticamente un evento en Google Calendar.

El flujo es:

Cita pendiente
        ↓
Coordinador acepta
        ↓
Validación de permisos
        ↓
Obtención de disponibilidad
        ↓
Obtención de duración
        ↓
Creación del evento
        ↓
Google Calendar
        ↓
Cita aceptada

La cita solamente se actualiza a aceptada después de que el evento se crea correctamente en Google Calendar.

Motivo

Mantener sincronizado el estado de la cita con la creación del evento en el calendario del coordinador.

Estado

Implementado y probado correctamente.

### Decisión 9

Las citas rechazadas no generan eventos en Google Calendar.

Cuando el coordinador rechaza una cita, únicamente se actualiza su estado a:

rechazada
Motivo

Una cita rechazada no debe ocupar un espacio en el calendario del coordinador.

Estado

Implementado.

### Decisión 10

La integración con Google Calendar utiliza el calendario principal (primary) del coordinador autorizado.

Motivo

Permitir que las citas académicas aparezcan directamente en el calendario principal de la cuenta de Google autorizada.

Estado

Implementado y probado.

### Decisión 11

La información de Google Calendar se separa del resto de los datos de usuarios mediante una tabla específica:

google_calendar_tokens
Motivo

Mantener separada la información relacionada con la autenticación de Google Calendar y facilitar su administración.

Estado

Implementado.

### Decisión 12

Las mejoras de optimización y refactorización se realizarán después de completar las funcionalidades principales.

Motivo

Priorizar primero la estabilidad y funcionamiento completo del sistema antes de realizar cambios estructurales que puedan introducir errores.

Estado

Criterio establecido para el proyecto.