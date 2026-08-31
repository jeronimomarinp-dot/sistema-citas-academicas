# Backlog Técnico

## Estado

Este documento contiene tareas de refactorización, optimización y mejoras técnicas que no bloquean el funcionamiento actual del sistema.

---

## Tareas finalizadas

### BT-002

Crear la carpeta `services/` para separar la lógica de negocio.

Archivos implementados:

- `areas.service.js`
- `disponibilidad.service.js`
- `citas.service.js`
- `usuarios.service.js`
- `google-calendar.service.js`

Estado:

FINALIZADO

---

### BT-003

Eliminar código duplicado de validación de roles.

La validación de roles se centralizó mediante:

- `auth.middleware.js`
- `roles.middleware.js`

Las rutas utilizan el middleware correspondiente según el rol requerido.

Estado:

FINALIZADO

---

### BT-009

Reemplazar los campos manuales de fecha y hora por horarios obtenidos desde la disponibilidad del coordinador.

Implementado:

- Validación del día de la semana.
- Validación del horario.
- Validación de duración.
- Validación de bloques horarios.
- Validación de disponibilidad.
- Validación de horas ocupadas.

Pruebas realizadas:

- 08:15
- 15:00
- Día sin disponibilidad
- Hora ocupada

Estado:

FINALIZADO Y PROBADO

---

## Pendientes de refactorización

### BT-001

Centralizar la función `cerrarSesion()` en `auth.js`.

Estado:

PENDIENTE

---

### BT-004

Centralizar la carga de estadísticas.

Objetivo:

Mover la lógica relacionada con la carga de estadísticas a una estructura más organizada y reutilizable.

Estado:

PENDIENTE

---

### BT-005

Crear utilidad de validación de contraseñas.

Posible ubicación:

`assets/js/utils/validaciones.js`

Estado:

PENDIENTE

---

### BT-006

Extraer la generación dinámica de tablas a funciones reutilizables.

Objetivo:

Evitar repetir código de generación de filas y tablas HTML en diferentes módulos.

Estado:

PENDIENTE

---

### BT-007

Reemplazar `prompt()` por un modal de Bootstrap.

El modal deberá permitir seleccionar el rol mediante un `<select>`.

Opciones:

- Estudiante
- Coordinador
- Administrador

Objetivo:

- Mejorar la interfaz.
- Evitar errores al escribir el rol.
- Facilitar futuras validaciones.

Estado:

PENDIENTE

---

### BT-008

Ocultar los botones de aceptar/rechazar cuando una cita ya haya sido gestionada.

Nota:

El backend ya evita procesar nuevamente una cita que tenga el mismo estado, pero queda pendiente implementar el comportamiento visual en el frontend.

Estado:

PENDIENTE

---

### BT-010

Extraer la generación dinámica de filas de disponibilidad a funciones reutilizables.

Ejemplo:

```javascript
function crearFilaDisponibilidad(horario) {
    return `...`;
}
---

### BT-011

Crear una utilidad para centralizar flujos repetidos como:

modal.hide();
form.reset();
cargarDatos();

Objetivo:

Reducir código repetido en diferentes módulos.

Estado:

PENDIENTE
---

### BT-012

Realizar una limpieza y revisión de consistencia del código relacionado con el módulo de Disponibilidad.

Estado:

PENDIENTE
---

### BT-013

Crear una ruta específica para obtener una disponibilidad por ID:

GET /api/disponibilidad/:id

Actualmente algunas funciones obtienen toda la lista y posteriormente buscan el registro correspondiente.

Objetivo:

Reducir datos transferidos.
Mejorar eficiencia.
Facilitar escalabilidad.

Estado:

PENDIENTE
---

### BT-014

Unificar la nomenclatura utilizada para representar el estado de disponibilidad.

Actualmente se utiliza el campo activo.

Objetivo:

Definir una nomenclatura consistente para todo el proyecto.

Estado:

PENDIENTE
---

### BT-015

Extender el estilo RESTful de las rutas al resto de módulos del sistema.

Actualmente Disponibilidad utiliza:

POST   /api/disponibilidad
GET    /api/disponibilidad
PUT    /api/disponibilidad/:id
PUT    /api/disponibilidad/:id/estado
DELETE /api/disponibilidad/:id

Objetivo:

Aplicar una estructura consistente a módulos como:

Usuarios
Citas
Áreas

Estado:

PENDIENTE
---

### BT-016

Centralizar las estadísticas de Disponibilidad en el backend.

Propuesta:

GET /api/disponibilidad/resumen

Actualmente las tarjetas estadísticas se calculan desde el frontend utilizando información obtenida del backend.

Estado:

PENDIENTE
---

### BT-017

Mejorar las métricas del Dashboard de Disponibilidad.

Actualmente existe:

Duración Promedio

Se propone evaluar métricas como:

Citas posibles por semana
Capacidad semanal del coordinador
Próxima disponibilidad

Estado:

PENDIENTE
---

### BT-018

Revisar la duplicación entre:

obtenerMaterialPorId()

y:

obtenerMaterial()

Objetivo:

Determinar si ambas funciones pueden unificarse sin afectar el flujo de descarga de materiales.

Estado:

PENDIENTE
---

