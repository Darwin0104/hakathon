const { body, param } = require('express-validator');

const validarCrearUsuario = [
    body('nombre').isString().notEmpty(),
    body('apellido').isString().notEmpty(),
    body('nickname').isString().notEmpty(),
    body('email').isEmail().notEmpty(),
    body('telefono').isString().notEmpty(),
    body('contrasena').isString().notEmpty(),
    body('categoria').isIn(['Administrador', 'Usuario Estándar', 'Usuario VIP'])
];

const validarVerificarTarjetaVIP = [
    body('id').isMongoId().notEmpty(),
    body('numeroTarjeta').isString().notEmpty()
];

const validarObtenerDetallesUsuario = [
    param('id').notEmpty()
];

const validarTarjetaCliente =[
    body('id').isMongoId().notEmpty()
]

const validarActualizarRolUsuario = [
    body('id').isMongoId().notEmpty(),
    body('nuevoRol').isIn(['Administrador', 'Usuario Estándar', 'Usuario VIP']).notEmpty()
];

module.exports = {
    validarCrearUsuario,
    validarVerificarTarjetaVIP,
    validarObtenerDetallesUsuario,
    validarActualizarRolUsuario,
    validarTarjetaCliente
};