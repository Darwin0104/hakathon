import { connect } from "../../helper/db/connect.js";
import { ObjectId } from "mongodb";

export class Funciones extends connect {
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
    async findFunciones() {
        let res = await this.collection.find({}).toArray();
        return res;
    };
/**
 * * API para Verificar Disponibilidad de Asientos:
 * TODO: Permite la consulta de la disponibilidad de asientos en una sala para una proyección específica.
 * @param {ObjectId} id - El ID de la función que se desea consultar la disponibilidad.
 * @returns {Object} - Un objeto con el estado y el mensaje o los detalles de disponibilidad.
 * @returns {error} - si el id no existe, o algun dato durante la consulta falla.
 */
async findAvailableBoletas(id) {
    try {
        // Buscar la función por ID
        const funcion = await this.collection.findOne({ _id: new ObjectId(id) });
        if (!funcion) {
            return { status: 'Not Found', mensaje: 'La función ingresada no existe, por favor revíselo nuevamente.' };
        }

        // Buscar los datos de la sala en la colección de 'lugar'
        const lugar = await this.lugarCollection.findOne({ _id: new ObjectId(funcion.id_lugar) });
        if (!lugar) {
            return { status: 'Not Found', mensaje: 'La sala especificada no existe, por favor revíselo nuevamente.' };
        }

        // Buscar los códigos de asientos en la colección de asientos
        const asientos = await this.asientosCollection.find({ id_lugar: new ObjectId(funcion.id_lugar) }).toArray();
        if (asientos.length === 0) {
            return { status: 'Not Found', mensaje: 'Los asientos para la sala especificada no existen.' };
        }

        // Obtener los asientos ocupados de la función
        const asientosOcupados = funcion.Asientos_Ocupados.map(asiento => asiento.codigo_asiento);

        // Calcular los asientos disponibles
        const asientosDisponibles = asientos
            .flatMap(asiento => asiento.codigo)
            .filter(asiento => !asientosOcupados.includes(asiento.codigo_asiento))
            .map(asiento => asiento.codigo_asiento); // Solo incluir el código del asiento en la respuesta

        // Formatear la respuesta
        return {
            status: 'Success',
            mensaje: 'Consulta de disponibilidad realizada con éxito.',
            datos: {
                sala: lugar.nombre,
                asientosDisponibles: asientosDisponibles // Solo el array de códigos de asientos disponibles
            }
        };

    } catch (error) {
        // Captura y retorna errores
        return { status: 'Error', mensaje: error.message || 'Error inesperado' };
    }
}


      /**
     * * API para Reservar Asientos:
     * Permite la selección y reserva de asientos para una proyección específica.
     * @param {ObjectId} id - El ID de la función en la que se desea reservar asientos.
     * @param {Array} asientosSeleccionados - Una lista de códigos de asientos a reservar.
     * @returns {Object} - Un objeto con el estado y el mensaje de la operación.
     */
      async reservarAsientos(id, asientosSeleccionados) {
        try {
            // Buscar la función por ID
            const funcion = await this.collection.findOne({ _id: new ObjectId(id) });
            if (!funcion) {
                return { status: 'Not Found', mensaje: 'La función ingresada no existe, por favor revíselo nuevamente.' };
            }
    
            // Buscar los datos de la sala en la colección de 'lugar'
            const lugar = await this.lugarCollection.findOne({ _id: new ObjectId(funcion.id_lugar) });
            if (!lugar) {
                return { status: 'Not Found', mensaje: 'La sala especificada no existe, por favor revíselo nuevamente.' };
            }
    
            // Buscar todos los asientos en la colección de 'asientos'
            const asientos = await this.asientosCollection.find({ id_lugar: new ObjectId(funcion.id_lugar) }).toArray();
            if (asientos.length === 0) {
                return { status: 'Not Found', mensaje: 'No se encontraron los asientos para la sala especificada.' };
            }
    
            // Aplanar la lista de asientos en un solo array
            const todosAsientos = asientos.flatMap(asiento => asiento.codigo);
    
            // Obtener los códigos de asientos ocupados de la función
            const asientosOcupados = new Set(funcion.Asientos_Ocupados.map(asiento => asiento.codigo_asiento));
    
            // Verificar disponibilidad de los asientos seleccionados
            for (const codigo of asientosSeleccionados) {
                const asiento = todosAsientos.find(a => a.codigo_asiento === codigo);
                if (!asiento) {
                    return { status: 'Error', mensaje: `El asiento ${codigo} no existe en la sala.` };
                }
                if (asientosOcupados.has(codigo)) {
                    return { status: 'Error', mensaje: `El asiento ${codigo} ya está reservado.` };
                }
            }
    
            // Reservar los asientos
            const asientosAReservar = asientosSeleccionados.map(codigo => ({ codigo_asiento: codigo, estado: 'reservado' }));
            await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $push: { Asientos_Ocupados: { $each: asientosAReservar } } }
            );
    
            // Formatear la respuesta
            return {
                status: 'Success',
                mensaje: 'Asientos reservados con éxito.'
            };
    
        } catch (error) {
            // Captura y retorna errores
            return { status: 'Error', mensaje: error.message || 'Error inesperado' };
        }
    }
    

    /**
     * * API para Cancelar Reserva de Asientos:
     * Permite la cancelación de una reserva de asientos ya realizada.
     * @param {ObjectId} id - El ID de la función en la que se desea cancelar la reserva.
     * @param {Array} asientosCancelar - Una lista de códigos de asientos a cancelar.
     * @returns {Object} - Un objeto con el estado y el mensaje de la operación.
     */
    async cancelarReserva(id, asientosCancelar) {
        try {
            // Buscar la función por ID
            const funcion = await this.collection.findOne({ _id: new ObjectId(id) });
            if (!funcion) {
                return { status: 'Not Found', mensaje: 'La función ingresada no existe, por favor revíselo nuevamente.' };
            }
    
            // Verificar los asientos ocupados
            const asientosOcupados = new Set(funcion.Asientos_Ocupados.map(asiento => asiento.codigo_asiento));
    
            // Verificar que los asientos a cancelar estén ocupados
            for (const codigo of asientosCancelar) {
                if (!asientosOcupados.has(codigo)) {
                    return { status: 'Error', mensaje: `El asiento ${codigo} no está reservado para esta función.` };
                }
            }
    
            // Cancelar los asientos utilizando aggregate y update
            const result = await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $pull: { Asientos_Ocupados: { codigo_asiento: { $in: asientosCancelar } } } }
            );
    
            if (result.modifiedCount === 0) {
                return { status: 'Error', mensaje: 'No se pudo cancelar la reserva de asientos.' };
            }
    
            // Formatear la respuesta
            return {
                status: 'Success',
                mensaje: 'Reserva de asientos cancelada con éxito.'
            };
    
        } catch (error) {
            // Captura y retorna errores
            let [status, mensaje] = `${error}`.split(": ");
            return { status, mensaje };
        }
    }
}    