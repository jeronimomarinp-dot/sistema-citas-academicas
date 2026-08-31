const materialesService =
    require('../services/materiales.service');


// CREAR MATERIAL

async function crearMaterial(req, res) {

    try {

        const coordinador_id =
            req.usuario.id;


        // Verificamos que multer haya recibido
        // un archivo

        if (!req.file) {

            return res.status(400).json({

                mensaje:
                    'Debe seleccionar un archivo.'

            });

        }


        const datos = {

            coordinador_id,

            titulo:
                req.body.titulo,

            descripcion:
                req.body.descripcion,

            nombre_original:
                req.file.originalname,

            nombre_guardado:
                req.file.filename,

            ruta_archivo:
                req.file.path,

            tipo_archivo:
                req.file.mimetype,

            tamano:
                req.file.size

        };


        const respuesta =
            await materialesService.crearMaterial(
                datos
            );


        res.status(201).json(respuesta);

    }
    catch (error) {

        console.error(error);


        res.status(400).json({

            mensaje:
                error.message

        });

    }

}


// OBTENER MATERIALES DEL COORDINADOR

async function obtenerMaterialesCoordinador(
    req,
    res
) {

    try {

        const coordinador_id =
            req.usuario.id;


        const materiales =
            await materialesService
                .obtenerMaterialesPorCoordinador(
                    coordinador_id
                );


        res.json(materiales);

    }
    catch (error) {

        console.error(error);


        res.status(500).json({

            mensaje:
                error.message

        });

    }

}


// OBTENER MATERIALES PARA ESTUDIANTES

async function obtenerMateriales(
    req,
    res
) {

    try {

        const materiales =
            await materialesService
                .obtenerMateriales();


        res.json(materiales);

    }
    catch (error) {

        console.error(error);


        res.status(500).json({

            mensaje:
                error.message

        });

    }

}


// OBTENER UN MATERIAL

async function obtenerMaterial(
    req,
    res
) {

    try {

        const id_material =
            req.params.id;


        const material =
            await materialesService
                .obtenerMaterialPorId(
                    id_material
                );


        res.json(material);

    }
    catch (error) {

        console.error(error);


        res.status(404).json({

            mensaje:
                error.message

        });

    }

}


// ELIMINAR MATERIAL

async function eliminarMaterial(
    req,
    res
) {

    try {

        const id_material =
            req.params.id;

        const coordinador_id =
            req.usuario.id;


        const respuesta =
            await materialesService
                .eliminarMaterial(
                    id_material,
                    coordinador_id
                );


        res.json(respuesta);

    }
    catch (error) {

        console.error(error);


        res.status(400).json({

            mensaje:
                error.message

        });

    }

}

async function descargarMaterial(req, res) {

    try {

        const id_material = req.params.id;

        const material =
            await materialesService.obtenerMaterial(
                id_material
            );

        if (!material) {

            return res.status(404).json({
                mensaje: 'Material no encontrado.'
            });

        }

        if (!material.activo) {

            return res.status(404).json({
                mensaje: 'El material ya no está disponible.'
            });

        }

        res.download(
            material.ruta_archivo,
            material.nombre_original,
            (error) => {

                if (error) {

                    console.error(
                        'Error descargando material:',
                        error
                    );

                }

            }
        );

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });

    }

}

async function actualizarEstado(req, res) {

    try {

        const id_material =
            req.params.id;

        const coordinador_id =
            req.usuario.id;

        const { activo } =
            req.body;


        if (activo !== 0 && activo !== 1) {

            return res.status(400).json({

                mensaje:
                    'El estado debe ser 0 o 1.'

            });

        }


        const respuesta =
            await materialesService.actualizarEstado(

                id_material,

                coordinador_id,

                activo

            );


        res.json(respuesta);

    }
    catch (error) {

        console.error(error);

        res.status(400).json({

            mensaje:
                error.message

        });

    }

}

module.exports = {

    crearMaterial,
    obtenerMaterialesCoordinador,
    obtenerMateriales,
    obtenerMaterial,
    eliminarMaterial,
    descargarMaterial,
    actualizarEstado

};