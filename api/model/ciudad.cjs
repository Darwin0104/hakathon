const { ObjectId } = require("mongodb");
const Connect = require("../../index.cjs");

module.exports = class Ciudad extends Connect {
    constructor() {
        // Implementación del patrón Singleton para evitar múltiples instancias de la clase Ciudad
        if (typeof Ciudad.instance === "object") {
            return Ciudad.instance;
        }
        super();
        // Definición de la colección en la base de datos
        this.collection = this.db.collection('ciudad');
        Ciudad.instance = this;
        return this;
    }

    // Obtener todas las ciudades
    async findAllCiudades() {
        return await this.collection.find({}).toArray();
    }

    // Obtener una ciudad por su ID
    async findCiudadById(id) {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }

    // Buscar ciudades por departamento
    async findByDepartamento(departamentoId) {
        return await this.collection.find({ idDepartamento: new ObjectId(departamentoId) }).toArray();
    }

    // Agregar una nueva ciudad
    async createCiudad(ciudadData) {
        try {
            const result = await this.collection.insertOne(ciudadData);
            return result;
        } catch (error) {
            throw new Error("Error al agregar la ciudad: " + error.message);
        }
    }

    // Eliminar una ciudad por su ID
    async deleteCiudad(id) {
        try {
            const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                throw new Error("No se encontró una ciudad con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al eliminar la ciudad: " + error.message);
        }
    }

    // Actualizar los datos de una ciudad por su ID
    async updateCiudad(id, ciudadData) {
        try {
            const result = await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: ciudadData }
            );
            if (result.matchedCount === 0) {
                throw new Error("No se encontró una ciudad con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al actualizar la ciudad: " + error.message);
        }
    }
};
