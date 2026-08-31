const materialesModel =
    require('../models/materiales.model');


// CREAR MATERIAL

async function crearMaterial(datos) {

    const {
        titulo,
        descripcion
    } = datos;


    if (!titulo || titulo.trim() === '') {

        throw new Error(
            'El título del material es obligatorio.'
        );

    }


    if (!datos.nombre_original) {

        throw new Error(
            'Debe seleccionar un archivo.'
        );

    }


    await materialesModel.crearMaterial(datos);


    return {
        mensaje:
            'Material académico subido correctamente.'
    };

}


// OBTENER MATERIALES DEL COORDINADOR

async function obtenerMaterialesPorCoordinador(
    coordinador_id
) {

    return await materialesModel
        .obtenerMaterialesPorCoordinador(
            coordinador_id
        );

}


// OBTENER MATERIALES PARA ESTUDIANTES

async function obtenerMateriales() {

    return await materialesModel
        .obtenerMateriales();

}


// OBTENER MATERIAL POR ID

async function obtenerMaterialPorId(
    id_material
) {

    const material =
        await materialesModel.obtenerMaterialPorId(
            id_material
        );


    if (!material) {

        throw new Error(
            'Material no encontrado.'
        );

    }


    return material;

}

async function obtenerMaterial(id_material) {

    return await materialesModel.obtenerMaterial(
        id_material
    );

}

// ELIMINAR / DESACTIVAR MATERIAL

async function eliminarMaterial(
    id_material,
    coordinador_id
) {

    const resultado =
        await materialesModel.eliminarMaterial(
            id_material,
            coordinador_id
        );


    if (resultado.affectedRows === 0) {

        throw new Error(
            'Material no encontrado o no pertenece al coordinador.'
        );

    }


    return {
        mensaje:
            'Material eliminado correctamente.'
    };

}

// ACTIVAR / DESACTIVAR MATERIAL

async function actualizarEstado(
    id_material,
    coordinador_id,
    activo
) {

    const resultado =
        await materialesModel.actualizarEstado(

            id_material,

            coordinador_id,

            activo

        );


    if (resultado.affectedRows === 0) {

        throw new Error(
            'Material no encontrado o no pertenece al coordinador.'
        );

    }


    return {

        mensaje:
            activo === 1

                ? 'Material activado correctamente.'

                : 'Material desactivado correctamente.'

    };

}

module.exports = {

    crearMaterial,
    obtenerMaterialesPorCoordinador,
    obtenerMateriales,
    obtenerMaterialPorId,
    obtenerMaterial,
    eliminarMaterial,
    actualizarEstado
};