const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const verificarToken = require('../middleware/auth.middleware');
const verificarRol = require('../middleware/roles.middleware');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ENTRAR AL SISTEMA LOGIN
router.post('/login', (req, res) => {

    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        });
    }

    const sql = `
        SELECT * FROM usuarios
        WHERE correo = ?
    `;

    connection.query(sql, [correo], (error, results) => {

        if (error) {

            console.log(error);

            return res.status(500).json({
                mensaje: 'Error en el servidor'
            });

        }

        if (results.length === 0) {

            return res.status(401).json({
                mensaje: 'Usuario no encontrado'
            });

        }

        const usuario = results[0];

        bcrypt.compare(
            password,
            usuario.password,
            (err, coincide) => {

                if (err) {

                    console.log(err);

                    return res.status(500).json({
                        mensaje: 'Error verificando contraseña'
                    });

                }

                if (!coincide) {

                    return res.status(401).json({
                        mensaje: 'Contraseña incorrecta'
                    });

                }

                const token = jwt.sign(
                    {
                        id: usuario.id_usuario,
                        rol: usuario.rol
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '8h'
                    }
                );

                res.json({
                    mensaje: 'Login exitoso',
                    token,
                    usuario: {
                        id: usuario.id_usuario,
                        nombre: usuario.nombre,
                        correo: usuario.correo,
                        rol: usuario.rol,
                        area_id: usuario.area_id
                    }
                });

            }
        );

    });

});

// REGISTRAR UN USUARIO COMO ROL DE ESTUDIANTE

router.post('/register', (req, res) => {

    const {
        nombre,
        correo,
        password,
        area_id
    } = req.body;

    const verificar = `
        SELECT id_usuario
        FROM usuarios
        WHERE correo = ?
    `;

    connection.query(
        verificar,
        [correo],
        (error, existe) => {

            if (error) {

                return res.status(500).json({
                    mensaje: 'Error servidor'
                });

            }

            if (existe.length > 0) {

                return res.status(400).json({
                    mensaje: 'El correo ya está registrado'
                });

            }

            bcrypt.hash(password, 10, (err, hash) => {

                if (err) {

                    console.log(err);

                    return res.status(500).json({
                        mensaje: 'Error encriptando contraseña'
                    });

                }

                const sql = `
                    INSERT INTO usuarios
                    (
                        nombre,
                        correo,
                        password,
                        rol,
                        area_id,
                        activo
                    )
                    VALUES
                    (?, ?, ?, 'estudiante', ?, 1)
                `;

                connection.query(
                    sql,
                    [
                        nombre,
                        correo,
                        hash,
                        area_id
                    ],
                    (error, result) => {

                        if (error) {

                            console.log(error);

                            return res.status(500).json({
                                mensaje: 'Error registrando usuario'
                            });

                        }

                        res.json({
                            mensaje: 'Usuario registrado correctamente'
                        });

                    }
                );

            });

        }
    );

});

// OBTENER USUARIOS

router.get(
    '/usuarios',
    verificarToken,
    verificarRol('admin'),
    (req, res) => {

        const sql = `
    
        SELECT
            id_usuario,
            nombre,
            correo,
            rol,
            activo
        FROM usuarios
    
    `;

        connection.query(sql, (error, results) => {

            if (error) {

                console.log(error);

                return res.status(500).json({
                    mensaje: 'Error obteniendo usuarios'
                });

            }

            res.json(results);

        });

    });

// CAMBIAR ROL

router.put(
    '/usuarios/rol/:id',
    verificarToken,
    verificarRol('admin'),
    (req, res) => {

        const id = req.params.id;

        const { rol } = req.body;

        const sql = `
        UPDATE usuarios
        SET rol = ?
        WHERE id_usuario = ?
    `;

        connection.query(
            sql,
            [rol, id],
            (error, result) => {

                if (error) {

                    console.log(error);

                    return res.status(500).json({
                        mensaje: 'Error actualizando rol'
                    });

                }

                res.json({
                    mensaje: 'Rol actualizado correctamente'
                });

            }
        );

    });


// CAMBIAR ESTADO

router.put(
    '/usuarios/estado/:id',
    verificarToken,
    verificarRol('admin'),
    (req, res) => {

        const id = req.params.id;

        const { activo } = req.body;

        const sql = `
        UPDATE usuarios
        SET activo = ?
        WHERE id_usuario = ?
    `;

        connection.query(
            sql,
            [activo, id],
            (error, result) => {

                if (error) {

                    console.log(error);

                    return res.status(500).json({
                        mensaje: 'Error actualizando estado'
                    });

                }

                res.json({
                    mensaje: 'Estado actualizado'
                });

            }
        );

    });

// CREAR COORDINADOR

router.post(
    '/crear-coordinador',
    verificarToken,
    verificarRol('admin'),
    (req, res) => {

        const {
            nombre,
            correo,
            password,
            area_id
        } = req.body;

        const verificar = `
        SELECT id_usuario
        FROM usuarios
        WHERE correo = ?
    `;

        connection.query(
            verificar,
            [correo],
            (error, existe) => {

                if (error) {

                    return res.status(500).json({
                        mensaje: 'Error servidor'
                    });

                }

                if (existe.length > 0) {

                    return res.status(400).json({
                        mensaje: 'El correo ya existe'
                    });

                }

                bcrypt.hash(password, 10, (err, hash) => {

                    if (err) {

                        return res.status(500).json({
                            mensaje: 'Error bcrypt'
                        });

                    }

                    const sql = `
                    INSERT INTO usuarios
                    (
                        nombre,
                        correo,
                        password,
                        rol,
                        area_id,
                        activo
                    )
                    VALUES
                    (?, ?, ?, 'coordinador', ?, 1)
                `;

                    connection.query(
                        sql,
                        [
                            nombre,
                            correo,
                            hash,
                            area_id
                        ],
                        (error, result) => {

                            if (error) {

                                console.log(error);

                                return res.status(500).json({
                                    mensaje: 'Error creando coordinador'
                                });

                            }

                            res.json({
                                mensaje: 'Coordinador creado correctamente'
                            });

                        }
                    );

                });

            }
        );

    });

// OBTENER COORDINADORES
router.get(
    '/coordinadores',
    verificarToken,
    verificarRol('estudiante'),
    (req, res) => {



        const sql = `
        SELECT
            u.id_usuario,
            u.nombre,
            a.nombre AS area
        FROM usuarios u
        INNER JOIN areas a
            ON u.area_id = a.id_area
        WHERE u.rol = 'coordinador'
        AND u.activo = 1
        ORDER BY u.nombre
    `;

        connection.query(sql, (error, results) => {

            if (error) {

                console.log(error);

                return res.status(500).json({
                    mensaje: 'Error obteniendo coordinadores'
                });

            }

            res.json(results);

        });

    });

// RECUPERAR CONTRASEÑA

router.post('/recuperar-password', (req, res) => {

    const { correo } = req.body;

    const sql = `
        SELECT id_usuario, nombre
        FROM usuarios
        WHERE correo = ?
    `;

    connection.query(sql, [correo], (error, results) => {

        if (error) {

            console.log(error);

            return res.status(500).json({
                mensaje: 'Error del servidor'
            });

        }

        if (results.length === 0) {

            return res.status(404).json({
                mensaje: 'Correo no encontrado'
            });

        }

        const usuario = results[0];

        const token = crypto.randomBytes(32).toString('hex');

        const expiracion = new Date(
            Date.now() + 3600000
        ); // 1 hora

        const sqlToken = `
            INSERT INTO password_resets
            (
                usuario_id,
                token,
                expiracion
            )
            VALUES (?, ?, ?)
        `;

        connection.query(
            sqlToken,
            [
                usuario.id_usuario,
                token,
                expiracion
            ],
            async (error) => {

                if (error) {

                    console.log(error);

                    return res.status(500).json({
                        mensaje: 'Error creando token'
                    });

                }

                try {

                    await transporter.sendMail({

                        from: process.env.EMAIL_USER,

                        to: correo,

                        subject: 'Recuperación de contraseña',

                        html: `
                            <h2>Hola ${usuario.nombre}</h2>

                            <p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>

                           <a href="http://127.0.0.1:5500/sistema-citas-academicas/frontend/pages/nueva-password.html?token=${token}">
                             Restablecer contraseña
                            </a>
                            
                        `

                    });

                    res.json({
                        mensaje: 'Correo enviado correctamente'
                    });

                }
                catch (error) {

                    console.log(error);

                    res.status(500).json({
                        mensaje: 'Error enviando correo'
                    });

                }

            }

        );

    });

});

// RESTABLECER CONTRASEÑA

router.post('/reset-password', (req, res) => {

    const { token, password } = req.body;

    const sqlBuscar = `
        SELECT *
        FROM password_resets
        WHERE token = ?
        AND expiracion > NOW()
    `;

    connection.query(
        sqlBuscar,
        [token],
        (error, results) => {

            if (error) {

                console.log(error);

                return res.status(500).json({
                    mensaje: 'Error del servidor'
                });

            }

            if (results.length === 0) {

                return res.status(400).json({
                    mensaje: 'Token inválido o expirado'
                });

            }

            const usuario_id = results[0].usuario_id;

            bcrypt.hash(password, 10, (err, hash) => {

                if (err) {

                    return res.status(500).json({
                        mensaje: 'Error encriptando contraseña'
                    });

                }

                const actualizarUsuario = `
                    UPDATE usuarios
                    SET password = ?
                    WHERE id_usuario = ?
                `;

                connection.query(
                    actualizarUsuario,
                    [hash, usuario_id],
                    (error2) => {

                        if (error2) {

                            console.log(error2);

                            return res.status(500).json({
                                mensaje: 'Error actualizando contraseña'
                            });

                        }

                        const eliminarToken = `
                            DELETE FROM password_resets
                            WHERE token = ?
                        `;

                        connection.query(
                            eliminarToken,
                            [token]
                        );

                        res.json({
                            mensaje: 'Contraseña actualizada correctamente'
                        });

                    }
                );

            });

        }
    );

});
module.exports = router;