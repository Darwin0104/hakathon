module.exports = class FuncionesDto {
    // Plantilla para la consulta de disponibilidad de asientos
    templateAvailableBoletas(sala, asientosDisponibles) {
        return {
            status: 200,
            message: 'Consulta de disponibilidad realizada con éxito.',
            datos: {
                sala: sala,
                asientosDisponibles: asientosDisponibles
            }
        };
    }

    // Plantilla para la reserva de asientos
    templateReservarAsientos() {
        return {
            status: 200,
            message: 'Asientos reservados con éxito.'
        };
    }

    // Plantilla para la cancelación de reserva de asientos
    templateCancelarReserva() {
        return {
            status: 200,
            message: 'Reserva de asientos cancelada con éxito.'
        };
    }

    // Plantilla para errores específicos
    templateErrorNotFound(message) {
        return {
            status: 404,
            message: message || 'No encontrado.'
        };
    }

    templateErrorInvalid(message) {
        return {
            status: 400,
            message: message || 'Solicitud incorrecta.'
        };
    }

    templateErrorUnexpected(message) {
        return {
            status: 500,
            message: message || 'Error inesperado.'
        };
    }
};
