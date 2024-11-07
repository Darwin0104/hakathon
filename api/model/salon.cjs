const { ObjectId } = require("mongodb");
const Connect = require("../../index.cjs");

module.exports = class Salones extends Connect {
    constructor() {
        // ! Patrón Singleton para asegurar que solo se crea una instancia de Salones
        if (typeof Salones.instance === "object") {
            return Salones.instance;
        }
        super();
        // * Establece la colección en "salon" dentro de la base de datos
        this.collection = this.db.collection('salon');
        Salones.instance = this;
        return this;
    }

    // * Obtener todos los salones de la colección "salon"
    async findAllSalones() {
        return await this.collection.find({}).toArray();
    }

    // * Encontrar un salón por su ID único
    async findSalonById(id) {
        return await this.collection.find({ _id: new ObjectId(id) }).toArray();
    }

    // * Buscar salones por nombre
    async findByNombre(nombre) {
        return await this.collection.find({ nombre: nombre }).toArray();
    }

    // * Buscar salones por capacidad
    async findByCapacidad(capacidad) {
        return await this.collection.find({ capacidad: capacidad }).toArray();
    }

    // * Buscar salones por horario disponible
    async findByHorarioDisponible(horario) {
        return await this.collection.find({ horarioDisponible: horario }).toArray();
    }

    // * Buscar salones por ID de sede
    async findByIdSede(idSede) {
        return await this.collection.find({ idSede: new ObjectId(idSede) }).toArray();
    }

    // * Verificar si existe un salón con un nombre específico
    async verificarNombreExistente(nombre) {
        return await this.collection.find({ nombre }).toArray();
    }

    // * Verificar si existe un salón con un horario disponible específico
    async verificarHorarioDisponible(horario) {
        return await this.collection.find({ horarioDisponible: horario }).toArray();
    }

    // * Agregar un nuevo salón a la colección
    async createSalon(salonData) {
        try {
            const result = await this.collection.insertOne(salonData);
            return result;
        } catch (error) {
            throw new Error("Error al agregar el salón: " + error.message);
        }
    }

    // * Eliminar un salón de la colección por su ID
    async deleteSalon(id) {
        try {
            const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
            // ? Si no se eliminó ningún documento, lanza un error
            if (result.deletedCount === 0) {
                throw new Error("No se encontró un salón con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al eliminar el salón: " + error.message);
        }
    }

    // * Actualizar los datos de un salón por su ID
    async updateSalon(id, salonData) {
        try {
            const result = await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: salonData }
            );
            // ? Si no se encontró un documento coincidente, lanza un error
            if (result.matchedCount === 0) {
                throw new Error("No se encontró un salón con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al actualizar el salón: " + error.message);
        }
    }
};
