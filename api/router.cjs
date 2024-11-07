const express = require('express');
const router = express.Router();
const funcionController = require('./controllers/funcionesController.cjs');
const funcionesValidator = require('./validators/funcionesValidator.cjs');
const clientesController = require('./controllers/clientesController.cjs');
const clientesValidator = require('./validators/usuarioValidator.cjs')
const peliculasController = require('./controllers/peliculasController.cjs');
const peliculasValidator = require('./validators/peliculasValidator.cjs');

router.post('/crear', clientesValidator.validarCrearUsuario, clientesController.crearUsuario);
router.post('/verificar-tarjeta', clientesValidator.validarVerificarTarjetaVIP, clientesController.verificarTarjetaVIP); 
router.get('/:id', clientesValidator.validarObtenerDetallesUsuario, clientesController.obtenerDetallesUsuario); 
router.put('/actualizar-rol', clientesValidator.validarActualizarRolUsuario, clientesController.actualizarRolUsuario);

// Ruta para consultar la disponibilidad de asientos
router.get('/funciones/:id/disponibilidad', funcionesValidator.checkAvailabilityValidator, funcionController.consultarDisponibilidad);

// Ruta para reservar asientos
router.post('/funciones/:id/reservar', funcionesValidator.reserveSeatsValidator, funcionController.reservarAsientos);

// Ruta para cancelar la reserva de asientos
router.post('/funciones/:id/cancelar', funcionesValidator.cancelReservationValidator, funcionController.cancelarReserva);

// Ruta para consultar todas las películas
router.get('/peliculas/', peliculasController.getAllFilms);

// Ruta para obtener detalles de una película específica
router.get('/peliculas/:id', peliculasValidator.validarIdPelicula, peliculasController.getFilmDetails);

// Ruta para obtener películas disponibles en cartelera
router.get('/peliculas-disponibles', peliculasController.getAvailableFunciones);

module.exports = router;
