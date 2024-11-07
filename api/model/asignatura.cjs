const { ObjectId } = require("mongodb");
const Connect = require("../../index.cjs");

module.exports = class Asignatura extends Connect {
    constructor() {
        // Implementación del patrón Singleton para evitar múltiples instancias de la clase Asignatura
        if (typeof Asignatura.instance === "object") {
            return Asignatura.instance;
        }
        super();
        this.collection = this.db.collection('asignatura'); // Definición de la colección en la base de datos
        Asignatura.instance = this;
        return this;
    }

    // Obtener todas las asignaturas
    async findAllAsignaturas() {
        return await this.collection.find({}).toArray();
    }

    // Obtener una asignatura por su ID
    async findAsignaturaById(id) {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }

    // Agregar una nueva asignatura
    async createAsignatura(asignaturaData) {
        try {
            const result = await this.collection.insertOne(asignaturaData);
            return result;
        } catch (error) {
            throw new Error("Error al agregar la asignatura: " + error.message);
        }
    }

    // Eliminar una asignatura por su ID
    async deleteAsignatura(id) {
        try {
            const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                throw new Error("No se encontró una asignatura con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al eliminar la asignatura: " + error.message);
        }
    }

    // Actualizar los datos de una asignatura por su ID
    async updateAsignatura(id, asignaturaData) {
        try {
            const result = await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: asignaturaData }
            );
            if (result.matchedCount === 0) {
                throw new Error("No se encontró una asignatura con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al actualizar la asignatura: " + error.message);
        }
    }
};
