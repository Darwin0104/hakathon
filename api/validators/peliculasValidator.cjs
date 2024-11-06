const { param, body } = require('express-validator');

const validarCrearPelicula = [
    body('titulo').isString().notEmpty().withMessage('El título es obligatorio.'),
    body('genero').isString().notEmpty().withMessage('El género es obligatorio.'),
    body('duracion').isInt({ min: 0 }).withMessage('La duración debe ser un número entero positivo.'),
    body('sinopsis').isString().notEmpty().withMessage('La sinopsis es obligatoria.')
];

const validarIdPelicula = [
    param('id')
        .isMongoId().withMessage('El id de la película no es válido.')
        .notEmpty().withMessage('El id de la película es obligatorio.')
];

module.exports = {
    validarCrearPelicula,
    validarIdPelicula
};
