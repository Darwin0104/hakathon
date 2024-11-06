module.exports = class UserDto {
    templateListNotUsers() {
        return {
            status: 404,
            message: "No hay usuarios registrados"
        };
    }

    templateListUsers(arg) {
        return {
            status: 200,
            message: arg
        };
    }

    templateExistUser({ nickname, email, telefono, nombre, apellido }) {
        return {
            status: 200,
            message: "Ya existe un usuario con los siguientes datos",
            data: { nickname, email, telefono, nombre, apellido }
        };
    }

    templateUserSave(arg) {
        return {
            status: 201,
            data: arg
        };
    }

    templateErrorUser(arg) {
        return {
            status: 500,
            message: "Ocurrió un error",
            data: arg
        };
    }

    templateErrorTarjeta(arg) {
        return {
            status: 404,
            message: "Cliente no encontrado o tarjeta no válida.",
            data: arg
        };
    }

    templateTarjetaValida() {
        return {
            status: 200,
            message: "Tarjeta válida. Puede proceder con la compra."
        };
    }

    templateUserNotFound() {
        return {
            status: 404,
            message: "Usuario no encontrado."
        };
    }

    templateUserDetails({ nickname, email, telefono, nombre, apellido, tarjetas }) {
        return {
            status: 200,
            message: "Detalles del usuario obtenidos correctamente.",
            data: { nickname, email, telefono, nombre, apellido, tarjetas }
        };
    }
    templateBadRequest(message) {
        return {
            status: 400,
            message: message || "Solicitud incorrecta"
        };
    }

    templateInvalidRole() {
        return {
            status: 400,
            message: "Rol no válido. Los roles permitidos son Administrador, Usuario Estándar, Usuario VIP."
        };
    }

    templateSuccessUpdateRole(data) {
        return {
            status: 200,
            message: "Rol actualizado correctamente.",
            data: data
        };
    }
    
   
};



