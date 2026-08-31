const multer = require('multer');
const path = require('path');


// CONFIGURACIÓN DEL ALMACENAMIENTO

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(
            null,
            path.join(
                __dirname,
                '../uploads/materiales'
            )
        );

    },

    filename: function (req, file, cb) {

        const nombreOriginal =
            path.basename(file.originalname);

        const nombreLimpio =
            nombreOriginal.replace(
                /[^a-zA-Z0-9._-]/g,
                '_'
            );

        const nombreArchivo =
            `${Date.now()}-${nombreLimpio}`;

        cb(
            null,
            nombreArchivo
        );

    }

});


// TIPOS DE ARCHIVO PERMITIDOS

const tiposPermitidos = [

    'application/pdf',

    'application/msword',

    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

    'application/vnd.ms-excel',

    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

];


// VALIDACIÓN DEL ARCHIVO

const fileFilter = (req, file, cb) => {

    if (
        tiposPermitidos.includes(
            file.mimetype
        )
    ) {

        cb(null, true);

    }
    else {

        cb(
            new Error(
                'Tipo de archivo no permitido. Solo se aceptan PDF, Word y Excel.'
            ),
            false
        );

    }

};


// CONFIGURACIÓN FINAL

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize:
            10 * 1024 * 1024

    }

});


module.exports = upload;