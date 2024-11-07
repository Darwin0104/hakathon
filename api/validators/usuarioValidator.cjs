const { body, param } = require('express-validator');

const validarCrearUsuario = [
    body('nombre').isString().notEmpty().withMessage('El nombre es obligatorio y debe ser una cadena de texto.'),
    body('apellido').isString().notEmpty().withMessage('El apellido es obligatorio y debe ser una cadena de texto.'),
    body('cedula').isInt({ min: 0 }).withMessage('La cédula debe ser un número entero positivo.'),
    body('edad').isInt({ min: 18, max: 100 }).withMessage('La edad debe ser un número entre 18 y 100.'),
    body('telefono').isString().matches(/^[0-9]{7,15}$/).withMessage('El teléfono debe ser una cadena numérica entre 7 y 15 dígitos.'),
    body('email').isEmail().withMessage('El correo electrónico debe ser válido.'),
    body('horariosDisponibles').isArray().withMessage('Los horarios disponibles deben ser un arreglo.').bail()
        .custom(arr => arr.every(id => id.match(/^[0-9a-fA-F]{24}$/))).withMessage('Cada horario debe ser un ObjectId válido.'),
    body('modalidad').isIn(['presencial', 'virtual']).withMessage('La modalidad debe ser "presencial" o "virtual".'),
    body('role').isMongoId().withMessage('El role debe ser un ObjectId válido.'),
    body('asignatura').isMongoId().withMessage('La asignatura debe ser un ObjectId válido.')
];

const validarActualizarUsuario = [
    param('id').isMongoId().withMessage('El ID del usuario debe ser un ObjectId válido.'),
    body('nombre').optional().isString().notEmpty().withMessage('El nombre debe ser una cadena de texto.'),
    body('apellido').optional().isString().notEmpty().withMessage('El apellido debe ser una cadena de texto.'),
    body('cedula').optional().isInt({ min: 0 }).withMessage('La cédula debe ser un número entero positivo.'),
    body('edad').optional().isInt({ min: 18, max: 100 }).withMessage('La edad debe ser un número entre 18 y 100.'),
    body('telefono').optional().isString().matches(/^[0-9]{7,15}$/).withMessage('El teléfono debe ser una cadena numérica entre 7 y 15 dígitos.'),
    body('email').optional().isEmail().withMessage('El correo electrónico debe ser válido.'),
    body('horariosDisponibles').optional().isArray().withMessage('Los horarios disponibles deben ser un arreglo.')
        .bail().custom(arr => arr.every(id => id.match(/^[0-9a-fA-F]{24}$/))).withMessage('Cada horario debe ser un ObjectId válido.'),
    body('modalidad').optional().isIn(['presencial', 'virtual']).withMessage('La modalidad debe ser "presencial" o "virtual".'),
    body('role').optional().isMongoId().withMessage('El role debe ser un ObjectId válido.'),
    body('asignatura').optional().isMongoId().withMessage('La asignatura debe ser un ObjectId válido.')
];

module.exports = {
    validarCrearUsuario,
    validarActualizarUsuario
};
