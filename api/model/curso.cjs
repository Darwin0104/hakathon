const { ObjectId } = require("mongodb");
const Connect = require("../../index.cjs");

module.exports = class Curso extends Connect {
    constructor() {
        // Implementación del patrón Singleton para evitar múltiples instancias
        if (typeof Curso.instance === "object") {
            return Curso.instance;
        }
        super();
        // Definición de la colección en la base de datos
        this.collection = this.db.collection('curso');
        Curso.instance = this;
        return this;
    }

    // Obtener todos los cursos
    async findAllCursos() {
        return await this.collection.find({}).toArray();
    }

    // Obtener un curso por su ID
    async findCursoById(id) {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }

    // Buscar cursos por generación
    async findByGeneracion(generacion) {
        return await this.collection.find({ generacion }).toArray();
    }

    // Buscar cursos por asignatura
    async findByAsignatura(asignaturaId) {
        return await this.collection.find({ asignatura: new ObjectId(asignaturaId) }).toArray();
    }

    // Agregar un nuevo curso
    async createCurso(cursoData) {
        try {
            const result = await this.collection.insertOne(cursoData);
            return result;
        } catch (error) {
            throw new Error("Error al agregar el curso: " + error.message);
        }
    }

    // Eliminar un curso por su ID
    async deleteCurso(id) {
        try {
            const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                throw new Error("No se encontró un curso con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al eliminar el curso: " + error.message);
        }
    }

    // Actualizar los datos de un curso por su ID
    async updateCurso(id, cursoData) {
        try {
            const result = await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: cursoData }
            );
            if (result.matchedCount === 0) {
                throw new Error("No se encontró un curso con ese ID.");
            }
            return result;
        } catch (error) {
            throw new Error("Error al actualizar el curso: " + error.message);
        }
    }
};
