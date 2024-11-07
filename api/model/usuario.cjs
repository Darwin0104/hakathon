const { ObjectId } = require("mongodb");
const Connect = require("../../index.cjs");

module.exports = class Usuarios extends Connect {
    constructor() {
        // ! Singleton pattern to ensure only one instance of Usuarios is created
        if (typeof Usuarios.instance === "object") {
            return Usuarios.instance;
        }
        super();
        // * Set the collection to "usuario" within the database
        this.collection = this.db.collection('usuario');
        Usuarios.instance = this;
        return this;
    }

    // * Get all users from the "usuario" collection
    async findAllUsuarios() {
        return await this.collection.find({}).toArray();
    }

    // * Find a user by their unique ObjectId
    async findUsuarioById(id) {
        return await this.collection.find({ _id: new ObjectId(id) }).toArray();
    }

    // * Find users based on available schedule
    async findByHorarioDisponible(horario) {
        return await this.collection.find({ horariosDisponibles: horario }).toArray();
    }

    // * Find users based on their mode (e.g., online, in-person)
    async findByModalidad(modalidad) {
        return await this.collection.find({ modalidad: modalidad }).toArray();
    }

    // * Find users based on their role (e.g., mentor, coordinator)
    async findByRole(role) {
        return await this.collection.find({ role: role }).toArray();
    }

    // * Find users based on their assigned subject
    async findByAsignatura(asignaturaId) {
        return await this.collection.find({ asignatura: new ObjectId(asignaturaId) }).toArray();
    }

    // * Find users by their name
    async findUsuarioByName(name) {
        return await this.collection.find({ "nombre": name }).toArray();
    }

    // * Find users by their cedula (ID)
    async findUsuarioByCedula(id) {
        return await this.collection.find({ "cedula": id }).toArray();
    }

    // * Check if an email already exists in the collection
    async verificarEmailExistente(email) {
        return await this.collection.find({ email });
    }

    // * Check if a phone number already exists in the collection
    async verificarTelefonoExistente(telefono) {
        return await this.collection.find({ telefono });
    }

    // * Check if a cedula (ID) already exists in the collection
    async verificarCedulaExistente(cedula) {
        return await this.collection.find({ cedula });
    }

    // * Add a new user to the collection
    async createUsuario(usuarioData) {
        try {
            const result = await this.collection.insertOne(usuarioData);
            return result;
        } catch (error) {
            throw new Error("Error al agregar el usuario: " + error.message);
        }
    }

    // * Delete a user from the collection by ID
    async deleteUsuario(id) {
        try {
            const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
            // ? If no documents were deleted, throw an error
            if (result.deletedCount === 0) {
                throw new Error("No se encontró un usuario con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al eliminar el usuario: " + error.message);
        }
    }

    // * Update a user's data by their ID
    async updateUsuario(id, usuarioData) {
        try {
            const result = await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: usuarioData }
            );
            // ? If no matching documents were found, throw an error
            if (result.matchedCount === 0) {
                throw new Error("No se encontró un usuario con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al actualizar el usuario: " + error.message);
        }
    }
};
