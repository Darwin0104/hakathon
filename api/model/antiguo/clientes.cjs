const { ObjectId } = require('mongodb');
const  connect = require('../../index.cjs');

/**
 * *Clase Clientes para gestionar las operaciones relacionadas con los clientes.
 * TODO: Extiende la clase connect para conectarse a la base de datos MongoDB.
 */
class Clientes extends connect {
    /**
     * * Constructor de la clase Clientes.
     * TODO: Implementa el patrón Singleton para asegurar que solo exista una instancia de esta clase.
     */
    constructor() {
        if (typeof Clientes.instance === "object") {
            return Clientes.instance;
        }
        super();
        this.base = this.db
        this.collection = this.db.collection('Cliente');
        Clientes.instance = this;
        return this;
    }

    /**
     * * API para Listar Usuarios:
     * * Obtiene todos los clientes de la colección 'Cliente'.
     * @returns {Array} Arreglo de documentos de clientes.
     */
    async findClientes() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    /**
     * *API para Verificar Tarjeta VIP
     * TODO: Verifica la validez de una tarjeta VIP durante el proceso de compra.
     * @param {string} nombre - El nombre del cliente.
     * @param {string} numeroTarjeta - El número de la tarjeta a verificar.
     * @returns {Object} Un objeto que indica el estado y el mensaje del resultado de la verificación.
     * @returns {error} Si el nombre del cliente, la tarjeta o algun dato no es correcto.
     */
    
    async existClientById(id) {
        const [cliente] = await this.collection.find({ _id: new ObjectId(id) }).toArray();
        return cliente;
    }

    async existClientByTarjeta(numeroTarjeta) {
        const [cliente] = await this.collection.find({
            "tarjeta.numero": numeroTarjeta,
            "tarjeta.estado": "activo"
        }).toArray();
        return cliente;
    }

    async verificarTarjetaPerteneceAlCliente(cliente, numeroTarjeta) {
        return cliente.tarjeta.find(t => t.numero === numeroTarjeta && t.estado === 'activo');
    }



/**
 * Crea un nuevo usuario en la base de datos.
 * @param {Object} nuevoUsuario - Objeto con los datos del usuario.
 * @param {string} nuevoUsuario.nombre - El nombre del usuario.
 * @param {string} nuevoUsuario.apellido - El apellido del usuario.
 * @param {string} nuevoUsuario.nickname - El apodo del usuario.
 * @param {string} nuevoUsuario.email - El correo electrónico del usuario.
 * @param {string} nuevoUsuario.telefono - El número de teléfono del usuario.
 * @param {string} nuevoUsuario.contrasena - La contraseña del usuario (será encriptada).
 * @param {string} nuevoUsuario.categoria - La categoría del usuario (Administrador, Usuario Estándar, Usuario VIP).
 * @returns {Object} Un objeto que indica el estado y el mensaje del resultado de la creación del usuario.
 */
    async verificarEmailExistente(email) {
        return await this.collection.find({ email });
    }

    async  verificarTelefonoExistente(telefono) {
    return await this.collection.find({ telefono });
    }

    async  verificarNicknameExistente(nickname) {
        return await this.collection.find({ nickname });
    }

    async validarCategoria(categoria) {
        const categoriasPermitidas = ['Administrador', 'Usuario Estándar', 'Usuario VIP'];
        return categoriasPermitidas.includes(categoria);
    }
    
    async insertarUsuario(usuario) {
        return await this.collection.insertOne(usuario);
    }
    
    async  crearUsuarioEnDB(nickname, contrasena, categoria) {
        return await this.db.command({
            createUser: nickname,
            pwd: contrasena, // Asegúrate de encriptar la contraseña antes de usarla
            roles: [{ role: categoria, db: 'CineCampus' }]
        });
    }
    
/**
 * Obtiene el descuento aplicable basado en la categoría del usuario.
 * @param {string} categoria - La categoría del usuario.
 * @returns {number} El porcentaje de descuento aplicable.
 */
    async obtenerDescuentoPorCategoria(categoria) {
    switch (categoria) {
        case 'Administrador':
            return 20;
        case 'Usuario Estándar':
            return 30;
        case 'Usuario VIP':
            return 45;
        default:
            return 0;
    }
}

    /**
     * * Busca un cliente por ID en la colección 'Cliente'.
     * @param {string} id - El ID del cliente.
     * @returns {Object} El cliente encontrado o null si no se encuentra.
     */
    async buscarClientePorId(id) {
        const [cliente] = await this.collection.find({ _id: new ObjectId(id) }).toArray();
        return cliente;
    }

    /**
     * * Obtiene los detalles de las tarjetas de un cliente.
     * @param {Object} cliente - El objeto cliente del cual se obtendrán las tarjetas.
     * @returns {Array} Arreglo con los detalles de las tarjetas del cliente.
     */
    async obtenerDetallesTarjetas(cliente) {
        return cliente.tarjeta || [];
    }
    /**
     * * Actualiza el rol de un usuario en la colección 'Cliente'.
     * @param {string} id - El ID del cliente.
     * @param {string} nuevoRol - El nuevo rol del cliente.
     * @returns {Object} El resultado de la actualización.
     */
    async actualizarRolEnColeccion(id, nuevoRol) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { categoria: nuevoRol } }
        );
    }

    /**
     * * Actualiza el rol del usuario a nivel de base de datos.
     * @param {string} nickname - El nickname del usuario.
     * @param {string} nuevoRol - El nuevo rol del usuario.
     * @returns {Object} El resultado de la actualización.
     */
    async actualizarRolEnDB(nickname, nuevoRol) {
        return await this.db.command({
            updateUser: nickname,
            roles: [{ role: nuevoRol, db: 'CineCampus' }]
        });
    }
}

module.exports = Clientes