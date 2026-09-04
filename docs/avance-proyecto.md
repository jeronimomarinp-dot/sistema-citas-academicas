# Sistema Inteligente de Citas Académicas

## Estado actual del proyecto

**Estado:** FINALIZADO Y FUNCIONAL

**Fecha de actualización:** 4 de septiembre de 2026

---

# 1. Descripción del proyecto

El Sistema Inteligente de Citas Académicas permite gestionar el proceso de solicitud y administración de citas entre estudiantes y coordinadores académicos.

El sistema permite:

- Autenticación de usuarios.
- Gestión de roles.
- Gestión de áreas académicas.
- Gestión de disponibilidad de coordinadores.
- Consulta de materiales académicos.
- Agendamiento de citas.
- Aceptación y rechazo de citas.
- Notificaciones.
- Recuperación de contraseña mediante correo electrónico.
- Integración con Google Calendar.
- Chatbot.
- Acceso desde computador y dispositivos móviles mediante PWA.

---

# 2. Arquitectura

El proyecto utiliza una arquitectura modular basada en:

```text
Frontend
    ↓
API REST
    ↓
Routes
    ↓
Controllers
    ↓
Services
    ↓
Models
    ↓
Base de datos
 ---
  
Tecnologías principales

Frontend
HTML5
CSS3
JavaScript
Bootstrap
PWA
Backend
Node.js
Express
JWT
bcrypt
Multer
Google APIs
Resend
Base de datos
MySQL compatible
TiDB Cloud
Despliegue
GitHub
Render

# 3. Módulos implementados
3.1 Autenticación

Estado: TERMINADO

Funcionalidades:

Inicio de sesión.
Registro de estudiantes.
Recuperación de contraseña.
Cambio de contraseña mediante token.
Autenticación mediante JWT.
Protección de rutas.
Validación de roles.
Manejo de sesión mediante frontend.

3.2 Gestión de usuarios

Estado: TERMINADO

Se implementó la gestión de usuarios de acuerdo con los roles definidos en el sistema.

Roles principales:

Administrador.
Coordinador.
Estudiante.

Cada rol dispone de las funcionalidades correspondientes.

# 4. Áreas académicas

Estado: TERMINADO

El administrador puede gestionar las áreas académicas utilizadas por el sistema.

Funcionalidades:

Crear áreas.
Consultar áreas.
Editar áreas.
Activar/desactivar áreas.
---

# 5. Disponibilidad de coordinadores

Estado: TERMINADO Y PROBADO

El coordinador puede configurar su disponibilidad.

La configuración contempla:

Día de la semana.
Hora de inicio.
Hora de finalización.
Duración de cada cita.
Estado activo/inactivo.

También se implementaron validaciones para:

Horarios inválidos.
Cruces de horarios.
Rangos incorrectos.
Duraciones configurables.
---

# 6. Materiales académicos

Estado: TERMINADO Y PROBADO

El coordinador puede cargar materiales académicos para consulta de los estudiantes.

Formatos soportados:

PDF.
Word.
Excel.

Funcionalidades:

Subir material.
Registrar información en la base de datos.
Consultar materiales.
Descargar materiales.
Conservar el nombre original del archivo.
Desactivar materiales.
Ocultar materiales desactivados a los estudiantes.
Bloquear la descarga de materiales desactivados.

Los materiales también están integrados con el flujo de agendamiento.
---

# 7. Agendamiento de citas

Estado: TERMINADO Y PROBADO

El estudiante puede:

Seleccionar un coordinador.
Seleccionar una fecha.
Consultar la disponibilidad.
Seleccionar una hora disponible.
Registrar el motivo de la cita.
Enviar la solicitud.

El sistema genera automáticamente las horas disponibles según la duración configurada por el coordinador.

También elimina del selector las horas que ya están ocupadas.
---

# 8. Validaciones de citas

Estado: TERMINADO Y PROBADO

Las reglas críticas se validan en el backend.

El sistema verifica:

Disponibilidad del coordinador.
Día correspondiente.
Hora dentro del horario configurado.
Duración de la cita.
Que el bloque solicitado sea válido.
Que la cita no esté ocupada.

Esto evita que un usuario pueda crear manualmente una cita inválida mediante una petición directa a la API.
---

# 9. Gestión de citas

Estado: TERMINADO Y PROBADO

El coordinador puede consultar las solicitudes recibidas.

Estados disponibles:

Pendiente.
Aceptada.
Rechazada.
Finalizada.

El coordinador puede:

Aceptar una cita.
Rechazar una cita.

El estudiante puede consultar posteriormente el estado actualizado de su cita.
---

# 10. Notificaciones

Estado: TERMINADO Y PROBADO

El sistema genera notificaciones relacionadas con las citas.

Ejemplos:

Nueva solicitud de cita para el coordinador.
Cita aceptada para el estudiante.
Cita rechazada para el estudiante.

Las notificaciones se almacenan en la base de datos y pueden marcarse como leídas.
---

# 11. Recuperación de contraseña

Estado: TERMINADO Y PROBADO

Se implementó recuperación de contraseña mediante correo electrónico.

Proceso:

Usuario solicita recuperación
        ↓
Generación de token
        ↓
Almacenamiento temporal del token
        ↓
Envío del correo
        ↓
Usuario abre enlace
        ↓
Ingresa nueva contraseña
        ↓
Token validado
        ↓
Contraseña actualizada
        ↓
Redirección al login

El envío de correo utiliza Resend mediante API HTTP.
---

# 12. Integración con Google Calendar

Estado: TERMINADO Y PROBADO EN PRODUCCIÓN

Se implementó autenticación mediante Google OAuth 2.0.

El coordinador puede conectar su cuenta de Google Calendar.

Cuando una cita es aceptada:

Cita aceptada
      ↓
Sistema obtiene credenciales de Google
      ↓
Construye fecha y hora del evento
      ↓
Google Calendar API
      ↓
Evento creado en calendario

La zona horaria utilizada es:

America/Bogota

La integración fue probada en producción y la hora del evento coincide con la hora programada en el sistema.
---

# 13. Chatbot

Estado: FUNCIONAL

El sistema cuenta con un chatbot integrado para responder preguntas frecuentes relacionadas con el funcionamiento del sistema y la información académica disponible.
---

# 14. Aplicación web y PWA

Estado: TERMINADO Y PROBADO

El sistema puede utilizarse desde:

Computadores.
Teléfonos móviles.
Navegadores web.

Se implementó una Progressive Web App (PWA).

En dispositivos compatibles permite:

Añadir el sistema a la pantalla de inicio.
Abrirlo como aplicación.
Utilizar la interfaz desde el dispositivo móvil.

La instalación y funcionamiento fueron probados desde iPhone.
---

# 15. Despliegue

Estado: TERMINADO

El proyecto se encuentra desplegado utilizando:

GitHub
   ↓
Render
   ↓
Backend + Frontend
   ↓
TiDB Cloud

La aplicación se encuentra disponible en producción.

URL de producción:

https://sistema-citas-academicas-api.onrender.com
---

# 16. Seguridad

Se implementaron diferentes mecanismos de seguridad:

Contraseñas almacenadas mediante hash con bcrypt.
Autenticación mediante JWT.
Middleware de autenticación.
Middleware de autorización por roles.
Variables sensibles mediante variables de entorno.
Archivo .env excluido del repositorio.
Tokens de Google almacenados de forma separada.
Validaciones en backend.
---

# 17. Pruebas realizadas

Se realizaron pruebas individuales e integrales.

Materiales
Subida de PDF.
Subida de Word.
Subida de Excel.
Registro en base de datos.
Listado.
Descarga.
Nombre original.
Desactivación.
Bloqueo de descarga de material desactivado.

Resultado: OK

Disponibilidad
Crear disponibilidad.
Editar disponibilidad.
Activar/desactivar.
Validación de horarios.
Validación de cruces.
Duración configurable.
Generación de horarios.

Resultado: OK

Citas
Crear cita válida.
Hora ocupada.
Día sin disponibilidad.
Hora fuera del horario.
Duración incorrecta.
Aceptación.
Rechazo.
Consulta del estado.

Resultado: OK

Google Calendar
Conexión mediante Google OAuth.
Autorización.
Creación de evento.
Validación de fecha.
Validación de hora.
Validación de zona horaria.

Resultado: OK

Notificaciones
Nueva solicitud.
Aceptación.
Rechazo.

Resultado: OK

Recuperación de contraseña
Solicitud de recuperación.
Recepción del correo.
Apertura del enlace.
Cambio de contraseña.
Inicio de sesión con nueva contraseña.

Resultado: OK

Pruebas integrales

Se realizaron pruebas integrales para:

Administrador.
Coordinador.
Estudiante.
Flujo completo de solicitud y gestión de una cita.

Resultado: OK

PWA
Acceso desde iPhone.
Instalación en pantalla de inicio.
Apertura como aplicación.
Inicio de sesión.
Navegación.
Cierre y reapertura.

Resultado: OK
---

# 18. Estado final
Módulo	Estado
Autenticación	TERMINADO
Roles y permisos	TERMINADO
Usuarios	TERMINADO
Áreas académicas	TERMINADO
Disponibilidad	TERMINADO
Materiales académicos	TERMINADO
Agendamiento	TERMINADO
Validaciones backend	TERMINADO
Gestión de citas	TERMINADO
Notificaciones	TERMINADO
Recuperación de contraseña	TERMINADO
Google Calendar	TERMINADO
Chatbot	FUNCIONAL
PWA	TERMINADO
Despliegue	TERMINADO
Pruebas integrales	TERMINADO
Producción	ACTIVA
---

# 19. Limitaciones conocidas
Almacenamiento de archivos

El despliegue actual utiliza almacenamiento efímero para los archivos físicos cargados al servidor.

Por esta razón, los archivos almacenados localmente en el servidor pueden desaparecer después de determinados reinicios o nuevos despliegues.

Esta limitación no afecta el funcionamiento general de la demostración actual, pero para una solución de producción a largo plazo sería recomendable utilizar almacenamiento persistente externo.

Correo electrónico

El servicio de correo utiliza Resend. La configuración actual se encuentra orientada a las pruebas y demostración del sistema.
---

# 20. Estado de entrega

El sistema se considera:

PROYECTO FINALIZADO Y LISTO PARA ENTREGA

Las funcionalidades principales fueron implementadas, desplegadas y probadas.
---