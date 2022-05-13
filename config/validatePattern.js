'use strict'

module.exports = {
    rut: {
        pattern: '[0-9]{1,8}-[0-9|kK]{1}',
        message: 'Rut incorrecto, EJ: 12345678-9'
    },
    nombres: {
        pattern: '[a-zA-Z ]{2,40}',
        message: 'Mínimo 2 máximo 100 caracteres'
    },
    apellidos: {
        pattern: '[a-zA-Z ]{2,40}',
        message: 'Mínimo 2 máximo 100 caracteres'
    },
    direccion: {
        pattern: '^[a-zA-Z0-9_#. ]{5,100}',
        message: 'Mínimo 5 máximo 100 caracteres'
    },
    telefono: {
        pattern: '[0-9 ]{6,10}',
        message: 'Mínimo 6 máximo 10 caracteres'
    },
    correo: {
        pattern: '[a-zA-Z0-9._%+-]{1,40}[@]{1}[a-zA-Z0-9._%+-]{1,40}[.]{1}[a-zA-Z]{2,3}',
        message: 'Debe ser un correo valido, EJ: correo@dominio.cl'
    }
}