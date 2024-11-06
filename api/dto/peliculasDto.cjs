const { check, validationResult } = require('express-validator');

class PeliculasDto {
    static validateFilmId() {
        return [
            check('id')
                .isMongoId()
                .withMessage('El id proporcionado no es un ObjectId válido.')
        ];
    }

    static handleValidationErrors(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'Error', mensaje: errors.array() });
        }
        next();
    }
}

module.exports = PeliculasDto;
