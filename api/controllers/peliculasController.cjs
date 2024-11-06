const Peliculas = require('../model/peliculas.cjs');

class PeliculasController {
    constructor() {
        this.peliculasService = new Peliculas();
    }

    async getAllFilms(req, res) {
        try {
            const peliculas = await this.peliculasService.findAllPeliculas();
            res.status(200).json({ status: 'Success', mensaje: 'Películas recuperadas con éxito.', datos: peliculas });
        } catch (error) {
            res.status(500).json({ status: 'Error', mensaje: error.message });
        }
    }

    async getFilmDetails(req, res) {
        try {
            const { id } = req.params;
            const detalles = await this.peliculasService.findPeliculaById(id);
            if (!detalles) {
                return res.status(404).json({ status: 'Not Found', mensaje: 'El id de la película ingresada no existe.' });
            }
            res.status(200).json({ status: 'Success', mensaje: 'Detalles de la película recuperados con éxito.', datos: detalles });
        } catch (error) {
            res.status(500).json({ status: 'Error', mensaje: error.message });
        }
    }

    async getAvailableFunciones(req, res) {
        try {
            const funcionesDisponibles = await this.peliculasService.aggregateFunciones();
            res.status(200).json({ status: 'Success', mensaje: 'Funciones disponibles recuperadas con éxito.', datos: funcionesDisponibles });
        } catch (error) {
            res.status(500).json({ status: 'Error', mensaje: error.message });
        }
    }
}

module.exports = new PeliculasController();
