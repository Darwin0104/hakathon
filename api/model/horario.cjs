const { ObjectId } = require("mongodb");
const Connect = require("../../index.cjs");

module.exports = class Horarios extends Connect {
    constructor() {
        // ! Patrón Singleton para asegurar que solo se crea una instancia de Horarios
        if (typeof Horarios.instance === "object") {
            return Horarios.instance;
        }
        super();
        // * Establece la colección en "horarios" dentro de la base de datos
        this.collection = this.db.collection('horarios');
        Horarios.instance = this;
        return this;
    }

    // * Obtener todos los horarios de la colección "horarios"
    async findAllHorarios() {
        return await this.collection.find({}).toArray();
    }

    // * Encontrar un horario por su ID único
    async findHorarioById(id) {
        return await this.collection.find({ _id: new ObjectId(id) }).toArray();
    }

    // * Buscar horarios por rango horario específico
    async findByHorario(horario) {
        return await this.collection.find({ horarios: horario }).toArray();
    }

    // * Buscar horarios por modalidad (virtual o presencial)
    async findByModalidad(modalidad) {
        return await this.collection.find({ modalidad: modalidad }).toArray();
    }

    // * Buscar horarios por jornada (mañana, tarde o noche)
    async findByJornada(jornada) {
        return await this.collection.find({ jornada: jornada }).toArray();
    }

    // * Verificar si existe un horario con un rango específico
    async verificarHorarioExistente(horario) {
        return await this.collection.find({ horarios: horario }).toArray();
    }

    // * Agregar un nuevo horario a la colección
    async createHorario(horarioData) {
        try {
            const result = await this.collection.insertOne(horarioData);
            return result;
        } catch (error) {
            throw new Error("Error al agregar el horario: " + error.message);
        }
    }

    // * Eliminar un horario de la colección por su ID
    async deleteHorario(id) {
        try {
            const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
            // ? Si no se eliminó ningún documento, lanza un error
            if (result.deletedCount === 0) {
                throw new Error("No se encontró un horario con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al eliminar el horario: " + error.message);
        }
    }

    // * Actualizar los datos de un horario por su ID
    async updateHorario(id, horarioData) {
        try {
            const result = await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: horarioData }
            );
            // ? Si no se encontró un documento coincidente, lanza un error
            if (result.matchedCount === 0) {
                throw new Error("No se encontró un horario con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al actualizar el horario: " + error.message);
        }
    }
};
