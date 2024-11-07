const { ObjectId } = require("mongodb");
const Connect = require("../../index.cjs");

module.exports = class Sedes extends Connect {
    constructor() {
        // ! Singleton pattern to ensure only one instance of Sedes is created
        if (typeof Sedes.instance === "object") {
            return Sedes.instance;
        }
        super();
        // * Set the collection to "sede" within the database
        this.collection = this.db.collection('sede');
        Sedes.instance = this;
        return this;
    }

    // * Get all sedes from the "sede" collection
    async findAllSedes() {
        return await this.collection.find({}).toArray();
    }

    // * Find a sede by its unique ObjectId
    async findSedeById(id) {
        return await this.collection.find({ _id: new ObjectId(id) }).toArray();
    }

    // * Find sedes by name
    async findBySede(sedeName) {
        return await this.collection.find({ sede: sedeName }).toArray();
    }

    // * Find sedes by direccion (address)
    async findByDireccion(direccion) {
        return await this.collection.find({ direccion: direccion }).toArray();
    }

    // * Find sedes by idCiudad (city ID)
    async findByIdCiudad(idCiudad) {
        return await this.collection.find({ idCiudad: new ObjectId(idCiudad) }).toArray();
    }

    // * Check if a sede name already exists in the collection
    async verificarSedeExistente(sedeName) {
        return await this.collection.find({ sede: sedeName }).toArray();
    }

    // * Check if an address already exists in the collection
    async verificarDireccionExistente(direccion) {
        return await this.collection.find({ direccion: direccion }).toArray();
    }

    // * Check if a sede exists in a particular city (by idCiudad)
    async verificarSedePorCiudad(idCiudad) {
        return await this.collection.find({ idCiudad: new ObjectId(idCiudad) }).toArray();
    }

    // * Add a new sede to the collection
    async createSede(sedeData) {
        try {
            const result = await this.collection.insertOne(sedeData);
            return result;
        } catch (error) {
            throw new Error("Error al agregar la sede: " + error.message);
        }
    }

    // * Delete a sede from the collection by ID
    async deleteSede(id) {
        try {
            const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
            // ? If no documents were deleted, throw an error
            if (result.deletedCount === 0) {
                throw new Error("No se encontró una sede con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al eliminar la sede: " + error.message);
        }
    }

    // * Update a sede's data by its ID
    async updateSede(id, sedeData) {
        try {
            const result = await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: sedeData }
            );
            // ? If no matching documents were found, throw an error
            if (result.matchedCount === 0) {
                throw new Error("No se encontró una sede con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al actualizar la sede: " + error.message);
        }
    }
};
