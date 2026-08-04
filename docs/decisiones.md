# Decisiones de Arquitectura

## Decisión 1

Toda petición HTTP del frontend utilizará api.js.

No se utilizará fetch() directamente en ningún módulo.

Motivo:

- Centralizar autenticación.
- Evitar duplicación.
- Facilitar mantenimiento.

Fecha:

Módulo de Autenticación.