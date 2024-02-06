const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
    //spread operator sirve para significar "el restante del objeto"
    ...validarCampos,
    ...validarJWT,
    ...validaRoles

}