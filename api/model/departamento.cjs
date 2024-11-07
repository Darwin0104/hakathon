const { ObjectId } = require("mongodb");
const Connect = require("../../index.cjs");

module.exports = class Departamento extends Connect {
    constructor() {
        // Implementación del patrón Singleton para evitar múltiples instancias
        if (typeof Departamento.instance === "object") {
            return Departamento.instance;
        }
        super();
        // Definición de la colección en la base de datos
        this.collection = this.db.collection('departamento');
        Departamento.instance = this;
        return this;
    }

    // Obtener todos los departamentos
    async findAllDepartamentos() {
        return await this.collection.find({}).toArray();
    }

    // Obtener un departamento por su ID
    async findDepartamentoById(id) {
        return await this.collection.find({ _id: new ObjectId(id) }).toArray();
    }

    // Buscar un departamento por nombre
    async findDepartamentoByName(nombre) {
        return await this.collection.find({ nombre }).toArray();
    }

    // Agregar un nuevo departamento
    async createDepartamento(departamentoData) {
        try {
            const result = await this.collection.insertOne(departamentoData);
            return result;
        } catch (error) {
            throw new Error("Error al agregar el departamento: " + error.message);
        }
    }

    // Eliminar un departamento por su ID
    async deleteDepartamento(id) {
        try {
            const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                throw new Error("No se encontró un departamento con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al eliminar el departamento: " + error.message);
        }
    }

    // Actualizar los datos de un departamento por su ID
    async updateDepartamento(id, departamentoData) {
        try {
            const result = await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: departamentoData }
            );
            if (result.matchedCount === 0) {
                throw new Error("No se encontró un departamento con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al actualizar el departamento: " + error.message);
        }
    }
};
