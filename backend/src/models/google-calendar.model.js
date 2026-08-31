const connection = require('../config/db');

const guardarTokens = (
    id_usuario,
    access_token,
    refresh_token,
    token_expira,
    scope,
    token_type
) => {

    const sql = `
        INSERT INTO google_calendar_tokens
        (
            id_usuario,
            access_token,
            refresh_token,
            token_expira,
            scope,
            token_type
        )
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            access_token = VALUES(access_token),
            refresh_token = VALUES(refresh_token),
            token_expira = VALUES(token_expira),
            scope = VALUES(scope),
            token_type = VALUES(token_type)
    `;

    return new Promise((resolve, reject) => {

        connection.query(
            sql,
            [
                id_usuario,
                access_token,
                refresh_token,
                token_expira,
                scope,
                token_type
            ],
            (error, resultado) => {

                if (error) {
                    reject(error);
                    return;
                }

                resolve(resultado);

            }
        );

    });

};

const obtenerTokens = (id_usuario) => {

    const sql = `
        SELECT
            access_token,
            refresh_token,
            token_expira,
            scope,
            token_type
        FROM google_calendar_tokens
        WHERE id_usuario = ?
        LIMIT 1
    `;

    return new Promise((resolve, reject) => {

        connection.query(
            sql,
            [id_usuario],
            (error, resultados) => {

                if (error) {
                    reject(error);
                    return;
                }

                if (resultados.length === 0) {
                    resolve(null);
                    return;
                }

                resolve(resultados[0]);
            }
        );

    });

};

module.exports = {
    guardarTokens,
    obtenerTokens
};