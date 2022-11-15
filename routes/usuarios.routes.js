const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, validarEmail, existeUsuarioPorId } = require('../helpers/db-validators');
const validarCampos = require('../middlewares/validar-campos');



const router = Router();

router.get('/', usuariosGet)
router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido ),
    
    validarCampos
], usuariosPut)
router.post('/',[
    //validaciones de los campos a la hora de crear un objeto mediante la peticion del POST
    check('nombre', 'El nombre es obligatiorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail().custom(validarEmail),
    //validaciones personalizadas, en este caso se hace la validacion de roles contra la base de datos
    //ambas formas de escribirlo son las mismas
    // check('rol').custom( (rol) => esRoleValido(rol) ),
    check('rol').custom( esRoleValido ),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
], usuariosPost)
router.delete('/:id', usuariosDelete)
router.patch('/', usuariosPatch)



module.exports = router