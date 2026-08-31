-- Sistema Inteligente de Citas Académicas
-- Datos de prueba / demostración
-- Ejecutar DESPUÉS de sistema_citas_academicas.sql

USE `sistema_citas_academicas`;

SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO `areas`
(`id_area`, `nombre`, `descripcion`, `estado`)
VALUES
(1, 'Ingeniería de Sistemas', 'Área académica de Ingeniería de Sistemas', 1),
(2, 'Ingeniería Mecánica', 'Área académica de Ingeniería Mecánica', 1),
(3, 'Medicina', 'Área académica de Medicina', 1);

-- Contraseña para las tres cuentas: 123456
INSERT INTO `usuarios`
(`id_usuario`, `nombre`, `correo`, `password`, `rol`, `area_id`, `activo`)
VALUES
(1, 'Administrador de Prueba', 'admin.prueba@uam.edu.co', '$2b$10$6LW7nm9J94tRvFgJsanSyu2McyB/K3bPVFCM2z6Pcm3bP9qBBqQ4O', 'admin', NULL, 1),
(2, 'Coordinador de Prueba', 'coordinador.prueba@uam.edu.co', '$2b$10$6LW7nm9J94tRvFgJsanSyu2McyB/K3bPVFCM2z6Pcm3bP9qBBqQ4O', 'coordinador', 1, 1),
(3, 'Estudiante de Prueba', 'estudiante.prueba@uam.edu.co', '$2b$10$6LW7nm9J94tRvFgJsanSyu2McyB/K3bPVFCM2z6Pcm3bP9qBBqQ4O', 'estudiante', 1, 1);

INSERT INTO `disponibilidad_coordinador`
(`id_disponibilidad`, `coordinador_id`, `dia_semana`, `hora_inicio`, `hora_fin`, `duracion_cita`, `activo`)
VALUES
(1, 2, 'Lunes', '08:00:00', '12:00:00', 30, 1),
(2, 2, 'Martes', '14:00:00', '17:00:00', 30, 1),
(3, 2, 'Miércoles', '08:00:00', '12:00:00', 30, 1),
(4, 2, 'Jueves', '14:00:00', '17:00:00', 30, 1),
(5, 2, 'Viernes', '08:00:00', '12:00:00', 30, 1);

INSERT INTO `citas`
(`id_cita`, `id_estudiante`, `id_coordinador`, `fecha`, `hora`, `motivo`, `estado`)
VALUES
(1, 3, 2, '2026-09-07', '09:00:00', 'Consulta académica de prueba', 'pendiente'),
(2, 3, 2, '2026-09-08', '14:30:00', 'Revisión de proyecto de prueba', 'aceptada'),
(3, 3, 2, '2026-09-09', '10:00:00', 'Cita de demostración rechazada', 'rechazada');

INSERT INTO `preguntas_bot`
(`id_pregunta`, `pregunta`, `respuesta`, `area_id`, `coordinador_id`, `activo`)
VALUES
(1, '¿Cuál es el horario de atención?',
 'El horario de atención es de lunes a viernes de 8:00 AM a 5:00 PM.',
 1, 2, 1),
(2, '¿Cómo puedo agendar una cita?',
 'Ingresa a Agendar Cita, selecciona el área, el coordinador, la fecha y la hora disponibles.',
 1, 2, 1),
(3, '¿Dónde puedo consultar mis citas?',
 'Puedes consultar tus citas desde la opción Mis Citas del menú del estudiante.',
 1, 2, 1);

INSERT INTO `notificaciones`
(`id_notificacion`, `usuario_id`, `titulo`, `mensaje`, `tipo`, `leida`)
VALUES
(1, 3, 'Cita pendiente',
 'Tu solicitud de cita está pendiente de aprobación.',
 'cita', 0),
(2, 3, 'Cita aceptada',
 'Tu cita de demostración fue aceptada.',
 'cita', 1),
(3, 2, 'Nueva solicitud de cita',
 'Tienes una nueva solicitud de cita de un estudiante.',
 'cita', 0);

SET FOREIGN_KEY_CHECKS = 1;

COMMIT;
