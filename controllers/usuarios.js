const { response, request } = require('express');
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');



const usuariosGet = async (req = request, res = response) => {

    const query = { estado: true }
    const { limite = 5, desde = 0 } = req.query//query son todos los parametros adicionales que envio por el URL despues del simbolo ? y separados por &

    //Es la forma de enviar la respuesta con ambos resultados a la vez, debido a que son estructuras bloqueantes
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))//Establece un limite de registros
    ])
    res.json({
        total,
        usuarios
    })
}
const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body

    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario)
}
const usuariosPost = async (req, res = response) => {



    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar  en BD
    await usuario.save()

    res.json({
        msg: 'post API - controlador',
        usuario
    })
}
const usuariosDelete = async (req, res = response) => {

    const { id } = req.params

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json(usuario)
}
const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controlador'
    })
}


module.exports = {
    usuariosGet,
    usuariosPatch,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}