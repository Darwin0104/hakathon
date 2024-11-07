const { ObjectId } = require("mongodb");
const Connect = require("../../index.cjs");

module.exports = class Camper extends Connect {
    constructor() {
        // Implementación del patrón Singleton para evitar múltiples instancias de la clase Camper
        if (typeof Camper.instance === "object") {
            return Camper.instance;
        }
        super();
        this.collection = this.db.collection('camper'); // Definición de la colección en la base de datos
        Camper.instance = this;
        return this;
    }

    // Obtener todos los campers
    async findAllCampers() {
        return await this.collection.find({}).toArray();
    }

    // Obtener un camper por su ID
    async findCamperById(id) {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }

    // Buscar campers por asignatura
    async findByAsignatura(asignaturaId) {
        return await this.collection.find({ asignatura: new ObjectId(asignaturaId) }).toArray();
    }

    // Agregar un nuevo camper
    async createCamper(camperData) {
        try {
            const result = await this.collection.insertOne(camperData);
            return result;
        } catch (error) {
            throw new Error("Error al agregar el camper: " + error.message);
        }
    }

    // Eliminar un camper por su ID
    async deleteCamper(id) {
        try {
            const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                throw new Error("No se encontró un camper con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al eliminar el camper: " + error.message);
        }
    }

    // Actualizar los datos de un camper por su ID
    async updateCamper(id, camperData) {
        try {
            const result = await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: camperData }
            );
            if (result.matchedCount === 0) {
                throw new Error("No se encontró un camper con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al actualizar el camper: " + error.message);
        }
    }
};
