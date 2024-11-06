const { body, param } = require('express-validator');

// Valida la consulta de disponibilidad de asientos
exports.checkAvailabilityValidator = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido'),
];

// Valida la reserva de asientos
exports.reserveSeatsValidator = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido'),
    body('asientosSeleccionados').isArray().withMessage('Asientos seleccionados debe ser una lista de códigos de asientos'),
];

// Valida la cancelación de reservas
exports.cancelReservationValidator = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido'),
    body('asientosCancelar').isArray().withMessage('Asientos a cancelar debe ser una lista de códigos de asientos'),
];
