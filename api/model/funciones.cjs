const connect = require('../index.cjs');
const { ObjectId } = require("mongodb");

module.exports = class Funciones extends connect {
    constructor() {
        if (typeof Funciones.instance === "object") {
            return Funciones.instance;
        }
        super();
        this.collection = this.db.collection('Funciones');
        this.asientosCollection = this.db.collection('Asiento');
        this.lugarCollection = this.db.collection('Lugar');
        Funciones.instance = this;
        return this;
    }

    // Método para encontrar todas las funciones
    async findFunciones() {
        return await this.collection.find({}).toArray();
    }

    // Método para encontrar una función por ID
    async findFunctionById(id) {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }

    // Método para encontrar un lugar por ID
    async findLugarById(id) {
        return await this.lugarCollection.findOne({ _id: new ObjectId(id) });
    }

    // Buscar todos los asientos de una sala
    async findAsientosByLugar(idLugar) {
        return await this.asientosCollection.find({ id_lugar: new ObjectId(idLugar) }).toArray();
    }

    // Obtener los códigos de asientos ocupados de una función
    async getOccupiedSeats(id) {
        const funcion = await this.findFunctionById(id);
        return funcion ? funcion.Asientos_Ocupados.map(asiento => asiento.codigo_asiento) : [];
    }

    // Método para encontrar asientos por ID de lugar
    async findAsientosByLugarId(id_lugar) {
        return await this.asientosCollection.find({ id_lugar: new ObjectId(id_lugar) }).toArray();
    }

    // Método para actualizar asientos ocupados en una función
    async updateAsientosOcupados(id, asientosAReservar) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $push: { Asientos_Ocupados: { $each: asientosAReservar } } }
        );
    }

    // Método para cancelar asientos ocupados en una función
    async cancelarAsientos(id, asientosCancelar) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $pull: { Asientos_Ocupados: { codigo_asiento: { $in: asientosCancelar } } } }
        );
    }
}
