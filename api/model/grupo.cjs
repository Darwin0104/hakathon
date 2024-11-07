const { ObjectId } = require("mongodb");
const Connect = require("../../index.cjs");

module.exports = class Grupos extends Connect {
    constructor() {
        // ! Implementación del patrón Singleton para asegurar una sola instancia
        if (typeof Grupos.instance === "object") {
            return Grupos.instance;
        }
        super();
        // * Establece la colección en "grupos" dentro de la base de datos
        this.collection = this.db.collection('grupo');
        Grupos.instance = this;
        return this;
    }

    // * Obtener todos los grupos de la colección "grupos"
    async findAllGrupos() {
        return await this.collection.find({}).toArray();
    }

    // * Buscar un grupo específico por su ID
    async findGrupoById(id) {
        return await this.collection.find({ _id: new ObjectId(id) }).toArray();
    }

    // * Buscar grupos por el ID de horario
    async findByHorario(horarioId) {
        return await this.collection.find({ horario: new ObjectId(horarioId) }).toArray();
    }

    // * Buscar grupos por modalidad (virtual o presencial)
    async findByModalidad(modalidad) {
        return await this.collection.find({ modalidad: modalidad }).toArray();
    }

    // * Buscar grupos por disponibilidad (mañana, tarde, noche)
    async findByDisponibilidad(disponibilidad) {
        return await this.collection.find({ disponibilidad: disponibilidad }).toArray();
    }

    // * Verificar si un estudiante ya está asignado a un grupo específico
    async verificarEstudianteEnGrupo(estudianteId) {
        return await this.collection.find({ estudiantes: new ObjectId(estudianteId) }).toArray();
    }

    // * Agregar un nuevo grupo a la colección
    async createGrupo(grupoData) {
        try {
            const result = await this.collection.insertOne(grupoData);
            return result;
        } catch (error) {
            throw new Error("Error al agregar el grupo: " + error.message);
        }
    }

    // * Eliminar un grupo por su ID
    async deleteGrupo(id) {
        try {
            const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
            // ? Si no se eliminó ningún documento, lanza un error
            if (result.deletedCount === 0) {
                throw new Error("No se encontró un grupo con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al eliminar el grupo: " + error.message);
        }
    }

    // * Actualizar los datos de un grupo por su ID
    async updateGrupo(id, grupoData) {
        try {
            const result = await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: grupoData }
            );
            // ? Si no se encontró un documento coincidente, lanza un error
            if (result.matchedCount === 0) {
                throw new Error("No se encontró un grupo con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al actualizar el grupo: " + error.message);
        }
    }

    // * Agregar un estudiante al arreglo de estudiantes en un grupo específico
    async addEstudianteToGrupo(grupoId, estudianteId) {
        try {
            const result = await this.collection.updateOne(
                { _id: new ObjectId(grupoId) },
                { $addToSet: { estudiantes: new ObjectId(estudianteId) } }
            );
            // ? Si no se encontró un documento coincidente, lanza un error
            if (result.matchedCount === 0) {
                throw new Error("No se encontró un grupo con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al agregar estudiante al grupo: " + error.message);
        }
    }

    // * Eliminar un estudiante del arreglo de estudiantes en un grupo específico
    async removeEstudianteFromGrupo(grupoId, estudianteId) {
        try {
            const result = await this.collection.updateOne(
                { _id: new ObjectId(grupoId) },
                { $pull: { estudiantes: new ObjectId(estudianteId) } }
            );
            // ? Si no se encontró un documento coincidente, lanza un error
            if (result.matchedCount === 0) {
                throw new Error("No se encontró un grupo con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al eliminar estudiante del grupo: " + error.message);
        }
    }
};
