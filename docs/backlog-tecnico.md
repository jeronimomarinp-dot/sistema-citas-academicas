# Backlog Técnico

## Pendientes de Refactorización

### BT-001
Centralizar la función cerrarSesion() en auth.js.

Estado:
Pendiente

Momento de implementación:
Después de terminar la migración completa a api.js.

---

### BT-002
Crear carpeta services/.

- areas.service.js
- disponibilidad.service.js
- citas.service.js
- usuarios.service.js

Estado:
Pendiente

Momento de implementación:
Cuando todo el frontend utilice api.js.

---

### BT-003
Eliminar código duplicado de validación de roles.

Estado:
Pendiente

Momento:
Después de finalizar el módulo de citas.

### BT-004
Centralizar la carga de estadisticas 

Estado:
pendiente

Momento:
Se abordara cuando se cree la carpeta sevices

### BT-005
Crear utilidad de validación de contraseñas 

Estado:
pendiente

Momento:
Mas adelante se puede crear un archivo - assets/js/utils/validaciones.js 

### BT-006
Extraer la generación dinámica de tablas a funciones reutilizables.

### BT-007

Reemplazar prompt() por un modal de Bootstrap.

Más adelante podríamos mostrar un modal con un <select> que contenga:

Estudiante
Coordinador
Administrador

Ventajas:

Interfaz más profesional.
Evita errores al escribir el rol.
Permite agregar validaciones fácilmente.

Lo dejaremos para una fase de mejora de interfaz, después de terminar las funcionalidades principales.

### BT-008

Ocultar botones de aceptar/rechazar cuando la cita
ya fue gestionada.

### BT-009

Reemplazar los campos manuales de fecha y hora
por horarios obtenidos desde la disponibilidad
del coordinador.

Estado:
Se implementará durante la integración del módulo
de disponibilidad con el agendamiento.