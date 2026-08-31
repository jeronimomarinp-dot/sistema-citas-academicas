const connection = require('../config/db');


// CREAR MATERIAL

function crearMaterial(datos) {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO materiales_academicos
            (
                coordinador_id,
                titulo,
                descripcion,
                nombre_original,
                nombre_guardado,
                ruta_archivo,
                tipo_archivo,
                tamano,
                activo
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(
            sql,
            [
                datos.coordinador_id,
                datos.titulo,
                datos.descripcion,
                datos.nombre_original,
                datos.nombre_guardado,
                datos.ruta_archivo,
                datos.tipo_archivo,
                datos.tamano,
                1
            ],
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result);

            }
        );

    });

}


// OBTENER MATERIALES DEL COORDINADOR

function obtenerMaterialesPorCoordinador(coordinador_id) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT *
            FROM materiales_academicos
            WHERE coordinador_id = ?
            AND activo = 1
            ORDER BY created_at DESC
        `;

        connection.query(
            sql,
            [coordinador_id],
            (error, results) => {

                if (error) {
                    return reject(error);
                }

                resolve(results);

            }
        );

    });

}


// OBTENER TODOS LOS MATERIALES PARA ESTUDIANTES

function obtenerMateriales() {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                materiales_academicos.*,
                usuarios.nombre AS coordinador

            FROM materiales_academicos

            INNER JOIN usuarios
                ON materiales_academicos.coordinador_id =
                   usuarios.id_usuario

            WHERE materiales_academicos.activo = 1

            ORDER BY materiales_academicos.created_at DESC
        `;

        connection.query(
            sql,
            (error, results) => {

                if (error) {
                    return reject(error);
                }

                resolve(results);

            }
        );

    });

}

function obtenerMaterial(id_material) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                *
            FROM materiales_academicos
            WHERE id_material = ?
            AND activo = 1
            LIMIT 1
        `;

        connection.query(
            sql,
            [id_material],
            (error, results) => {

                if (error) {

                    return reject(error);

                }

                if (results.length === 0) {

                    return resolve(null);

                }

                resolve(results[0]);

            }
        );

    });

}

// OBTENER UN MATERIAL POR ID

function obtenerMaterialPorId(id_material) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT *
            FROM materiales_academicos
            WHERE id_material = ?
            AND activo = 1
        `;

        connection.query(
            sql,
            [id_material],
            (error, results) => {

                if (error) {
                    return reject(error);
                }

                resolve(results[0]);

            }
        );

    });

}


// DESACTIVAR MATERIAL

function eliminarMaterial(id_material, coordinador_id) {

    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE materiales_academicos
            SET activo = 0
            WHERE id_material = ?
            AND coordinador_id = ?
        `;

        connection.query(
            sql,
            [
                id_material,
                coordinador_id
            ],
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result);

            }
        );

    });

}

// ACTIVAR / DESACTIVAR MATERIAL

function actualizarEstado(
    id_material,
    coordinador_id,
    activo
) {

    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE materiales_academicos

            SET activo = ?

            WHERE id_material = ?

            AND coordinador_id = ?
        `;


        connection.query(

            sql,

            [
                activo,
                id_material,
                coordinador_id
            ],

            (error, result) => {

                if (error) {

                    return reject(error);

                }

                resolve(result);

            }

        );

    });

}

module.exports = {

    crearMaterial,
    obtenerMaterialesPorCoordinador,
    obtenerMateriales,
    obtenerMaterial,
    obtenerMaterialPorId,
    eliminarMaterial,
    actualizarEstado
};