const Funciones = require('../model/funciones.cjs');
const FuncionesDto = require('../dto/funcionesDto.cjs');
const { validationResult } = require('express-validator');


const funciones = new Funciones();
const funcionesDto = new FuncionesDto();

/**
 * * Controlador para consultar la disponibilidad de asientos
 * @param {Object} req - La solicitud del cliente.
 * @param {Object} res - La respuesta que se enviará al cliente.
 */
async function consultarDisponibilidad(req, res) {
    const { id } = req.params;

    try {
        const errors =validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Buscar la función por ID
        const funcion = await funciones.findFunctionById(id);
        if (!funcion) {
            return res.status(404).json({ status: 'Not Found', mensaje: 'La función ingresada no existe, por favor revíselo nuevamente.' });
        }

        // Buscar los datos de la sala
        const lugar = await funciones.findLugarById(funcion.id_lugar);
        if (!lugar) {
            return res.status(404).json({ status: 'Not Found', mensaje: 'La sala especificada no existe, por favor revíselo nuevamente.' });
        }

        // Buscar los asientos en la colección
        const asientos = await funciones.findAsientosByLugar(funcion.id_lugar);
        if (asientos.length === 0) {
            return res.status(404).json({ status: 'Not Found', mensaje: 'Los asientos para la sala especificada no existen.' });
        }

        // Obtener los asientos ocupados
        const asientosOcupados = await funciones.getOccupiedSeats(id);

        // Calcular los asientos disponibles
        const asientosDisponibles = asientos
            .flatMap(asiento => asiento.codigo)
            .filter(asiento => !asientosOcupados.includes(asiento.codigo_asiento))
            .map(asiento => asiento.codigo_asiento);

        // Formatear la respuesta
        return res.status(200).json({
            status: 'Success',
            mensaje: 'Consulta de disponibilidad realizada con éxito.',
            datos: {
                sala: lugar.nombre,
                asientosDisponibles: asientosDisponibles
            }
        });

    } catch (error) {
        return res.status(500).json({ status: 'Error', mensaje: error.message || 'Error inesperado' });
    }
};
/**
 * * Controlador para reservar asientos
 * @param {Object} req - La solicitud del cliente.
 * @param {Object} res - La respuesta que se enviará al cliente.
 */
async function reservarAsientos(req, res) {
    const { id } = req.params;
    const { asientosSeleccionados } = req.body;

    try {
        const errors =validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const funcion = await funciones.findFunctionById(id);
        if (!funcion) {
            return res.status(404).json(funcionesDto.templateErrorNotFound('La función ingresada no existe.'));
        }

        const lugar = await funciones.findLugarById(funcion.id_lugar);
        if (!lugar) {
            return res.status(404).json(funcionesDto.templateErrorNotFound('La sala especificada no existe.'));
        }

        const asientos = await funciones.findAsientosByLugarId(funcion.id_lugar);
        if (!asientos.length) {
            return res.status(404).json(funcionesDto.templateErrorNotFound('No se encontraron asientos para la sala especificada.'));
        }

        const todosAsientos = asientos.flatMap(asiento => asiento.codigo);
        const asientosOcupados = new Set(funcion.Asientos_Ocupados.map(asiento => asiento.codigo_asiento));

        for (const codigo of asientosSeleccionados) {
            const asiento = todosAsientos.find(a => a.codigo_asiento === codigo);
            if (!asiento) {
                return res.status(400).json(funcionesDto.templateErrorInvalid(`El asiento ${codigo} no existe en la sala.`));
            }
            if (asientosOcupados.has(codigo)) {
                return res.status(400).json(funcionesDto.templateErrorInvalid(`El asiento ${codigo} ya está reservado.`));
            }
        }

        const asientosAReservar = asientosSeleccionados.map(codigo => ({ codigo_asiento: codigo, estado: 'reservado' }));
        await funciones.updateAsientosOcupados(id, asientosAReservar);

        res.status(200).json(funcionesDto.templateReservarAsientos());
    } catch (error) {
        res.status(500).json(funcionesDto.templateErrorUnexpected(error.message));
    }
}

/**
 * * Controlador para cancelar la reserva de asientos
 * @param {Object} req - La solicitud del cliente.
 * @param {Object} res - La respuesta que se enviará al cliente.
 */
async function cancelarReserva(req, res) {
    const { id } = req.params;
    const { asientosCancelar } = req.body;

    try {
        const errors =validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const funcion = await funciones.findFunctionById(id);
        if (!funcion) {
            return res.status(404).json(funcionesDto.templateErrorNotFound('La función ingresada no existe.'));
        }

        const asientosOcupados = new Set(funcion.Asientos_Ocupados.map(asiento => asiento.codigo_asiento));

        for (const codigo of asientosCancelar) {
            if (!asientosOcupados.has(codigo)) {
                return res.status(400).json(funcionesDto.templateErrorInvalid(`El asiento ${codigo} no está reservado para esta función.`));
            }
        }

        const result = await funciones.cancelarAsientos(id, asientosCancelar);
        if (result.modifiedCount === 0) {
            return res.status(400).json(funcionesDto.templateErrorInvalid('No se pudo cancelar la reserva de asientos.'));
        }

        res.status(200).json(funcionesDto.templateCancelarReserva());
    } catch (error) {
        res.status(500).json(funcionesDto.templateErrorUnexpected(error.message));
    }
}

module.exports = {
    consultarDisponibilidad,
    reservarAsientos,
    cancelarReserva
};
