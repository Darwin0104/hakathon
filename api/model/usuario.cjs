const { ObjectId } = require("mongodb");
const Connect = require("../../index.cjs");

module.exports = class Usuarios extends Connect {
    constructor() {
        if (typeof Usuarios.instance === "object") {
            return Usuarios.instance;
        }
        super();
        this.collection = this.db.collection('Usuario');
        Usuarios.instance = this;
        return this;
    }

    // Obtener todos los usuarios
    async findAllUsuarios() {
        return await this.collection.find({}).toArray();
    }

    // Obtener un usuario por su ID
    async findUsuarioById(id) {
        return await this.collection.find({ _id: new ObjectId(id) }).toArray();
    }

    // Buscar un usuario por nombre
    async findUsuarioByName(name) {
        return await this.collection.find({ "nombre": name }).toArray();
    }

    // Agregar un nuevo usuario
    async createUsuario(usuarioData) {
        try {
            const result = await this.collection.insertOne(usuarioData);
            return result;
        } catch (error) {
            throw new Error("Error al agregar el usuario: " + error.message);
        }
    }

    // Eliminar un usuario por su ID
    async deleteUsuario(id) {
        try {
            const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                throw new Error("No se encontró un usuario con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al eliminar el usuario: " + error.message);
        }
    }

    // Actualizar los datos de un usuario por su ID
    async updateUsuario(id, usuarioData) {
        try {
            const result = await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: usuarioData }
            );
            if (result.matchedCount === 0) {
                throw new Error("No se encontró un usuario con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al actualizar el usuario: " + error.message);
        }
    }
};
