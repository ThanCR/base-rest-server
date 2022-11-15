const Role = require('../models/role')
const Usuario = require('../models/usuario')


const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error('Ocurrio un error al validar el rol');
    }
}
const validarEmail = async (email) => {
    const existeEmail = await Usuario.findOne({ email })
    if (existeEmail) {
        throw new Error('El correo ya existe')
    }
}
const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id)
    if ( !existeUsuario) {
        throw new Error(`El id ${id} no existe`)
    }
}




module.exports = {
    esRoleValido,
    validarEmail,
    existeUsuarioPorId
}