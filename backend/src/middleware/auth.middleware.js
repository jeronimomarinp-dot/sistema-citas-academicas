const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            mensaje: 'Token requerido'
        });

    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (error, usuario) => {

            if (error) {

                return res.status(403).json({
                    mensaje: 'Token inválido'
                });

            }

            req.usuario = usuario;

            next();

        }
    );

}

module.exports = verificarToken;