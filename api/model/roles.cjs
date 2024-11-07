const { ObjectId } = require("mongodb");
const Connect = require("../../index.cjs");

module.exports = class Roles extends Connect {
    constructor() {
        // ! Patrón Singleton para asegurar que solo se crea una instancia de Roles
        if (typeof Roles.instance === "object") {
            return Roles.instance;
        }
        super();
        // * Establece la colección en "roles" dentro de la base de datos
        this.collection = this.db.collection('roles');
        Roles.instance = this;
        return this;
    }

    // * Obtener todos los roles de la colección "roles"
    async findAllRoles() {
        return await this.collection.find({}).toArray();
    }

    // * Encontrar un rol por su ID único
    async findRoleById(id) {
        return await this.collection.find({ _id: new ObjectId(id) }).toArray();
    }

    // * Buscar roles por nombre del rol
    async findByRoleName(roleName) {
        return await this.collection.find({ role: roleName }).toArray();
    }

    // * Verificar si existe un rol con un nombre específico
    async verificarRoleExistente(roleName) {
        return await this.collection.find({ role: roleName }).toArray();
    }

    // * Agregar un nuevo rol a la colección
    async createRole(roleData) {
        try {
            const result = await this.collection.insertOne(roleData);
            return result;
        } catch (error) {
            throw new Error("Error al agregar el rol: " + error.message);
        }
    }

    // * Eliminar un rol de la colección por su ID
    async deleteRole(id) {
        try {
            const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
            // ? Si no se eliminó ningún documento, lanza un error
            if (result.deletedCount === 0) {
                throw new Error("No se encontró un rol con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al eliminar el rol: " + error.message);
        }
    }

    // * Actualizar los datos de un rol por su ID
    async updateRole(id, roleData) {
        try {
            const result = await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: roleData }
            );
            // ? Si no se encontró un documento coincidente, lanza un error
            if (result.matchedCount === 0) {
                throw new Error("No se encontró un rol con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al actualizar el rol: " + error.message);
        }
    }
};
