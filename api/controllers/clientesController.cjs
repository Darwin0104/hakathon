const { validationResult } = require('express-validator');
const Clientes = require('../model/clientes.cjs');
const UserDto = require('../dto/clienteDto.cjs');

const clientes = new Clientes();
const userDto = new UserDto();

async function crearUsuario(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nombre, apellido, nickname, email, telefono, contrasena, categoria } = req.body;

        // Validar categoría
        if (!await clientes.validarCategoria(categoria)) {
            return res.status(400).json(userDto.templateErrorUser('Categoría no válida.'));
        }

        // Verificar existencia del email, teléfono y nickname
        if (await clientes.verificarEmailExistente(email)) {
            return res.status(400).json(userDto.templateErrorUser('El email ya está registrado.'));
        }

        if (await clientes.verificarTelefonoExistente(telefono)) {
            return res.status(400).json(userDto.templateErrorUser('El teléfono ya está registrado.'));
        }

        if (await clientes.verificarNicknameExistente(nickname)) {
            return res.status(400).json(userDto.templateErrorUser('El nickname ya está en uso.'));
        }

        // Crear el usuario en la base de datos
        const nuevoUsuario = {
            nombre,
            apellido,
            nickname,
            email,
            telefono,
            contrasena, 
            categoria
        };

        // Insertar el usuario en la colección
        const resultadoInsercion = await clientes.insertarUsuario(nuevoUsuario);

        // Crear el usuario en la base de datos de MongoDB (roles)
        const resultadoCreacion = await clientes.crearUsuarioEnDB(nickname, contrasena, categoria);

        res.status(201).json({
            status: 'Success',
            mensaje: 'Usuario creado correctamente.',
            data: {
                ...resultadoInsercion,
                ...resultadoCreacion
            }
        });
    } catch (error) {
        res.status(500).json(userDto.templateErrorUser(error.message));
    }
}
async function verificarTarjetaVIP(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id, numeroTarjeta } = req.body;
        const cliente = await clientes.existClientById(id);
        if (!cliente || !clientes.verificarTarjetaPerteneceAlCliente(cliente, numeroTarjeta)) {
            return res.status(404).json(userDto.templateErrorTarjeta('Cliente no encontrado o tarjeta no válida.'));
        }
        res.status(200).json(userDto.templateTarjetaValida());
    } catch (error) {
        res.status(500).json(userDto.templateErrorUser(error.message));
    }
}

async function obtenerDetallesUsuario(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { id } = req.body;

        // Validación de la entrada
        if (!id) {
            const badRequestResponse = userDto.templateBadRequest("ID no proporcionado.");
            return res.status(badRequestResponse.status).json(badRequestResponse);
        }

        const clientesInstance = new Clientes();

        // Buscar el cliente por ID
        const cliente = await clientesInstance.buscarClientePorId(id);
        if (!cliente) {
            return res.status(userDto.templateUserNotFound().status).json(userDto.templateUserNotFound());
        }

        // Obtener los detalles de las tarjetas del cliente
        const tarjetas = await clientesInstance.obtenerDetallesTarjetas(cliente);

        // Estructurar la respuesta con el DTO
        const clienteDetalles = userDto.templateUserDetails({
            nickname: cliente.nickname,
            email: cliente.email,
            telefono: cliente.telefono,
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            tarjetas
        });

        return res.status(clienteDetalles.status).json(clienteDetalles);
    } catch (error) {
        return res.status(userDto.templateErrorUser(error).status).json(userDto.templateErrorUser(error));
    }
}

async function actualizarRolUsuario(req, res) {
    const { id, nuevoRol } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Validar el nuevo rol
        const esRolValido = await clientes.validarCategoria(nuevoRol);
        if (!esRolValido) {
            return res.status(400).json(userDto.templateInvalidRole());
        }

        // Buscar el usuario por ID
        const user = await clientes.buscarClientePorId(id);
        if (!user) {
            return res.status(404).json(userDto.templateUserNotFound());
        }

        const nicknameUser = user.nickname;

        // Actualizar el rol del usuario en la colección de clientes
        const resultado = await clientes.actualizarRolEnColeccion(id, nuevoRol);
        if (resultado.matchedCount === 0) {
            return res.status(404).json(userDto.templateUserNotFound());
        }

        // Actualizar el rol del usuario a nivel de base de datos
        const updateResult = await clientes.actualizarRolEnDB(nicknameUser, nuevoRol);

        return res.status(200).json(userDto.templateSuccessUpdateRole(updateResult));

    } catch (error) {
        return res.status(500).json(userDto.templateErrorUser(error.message));
    }
}

module.exports = {
    crearUsuario,
    verificarTarjetaVIP,
    obtenerDetallesUsuario,
    actualizarRolUsuario
};
