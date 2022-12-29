const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    google: {
        type: Boolean,
        default: false
    }
})

//En esta linea, tiene que ser una funcion normal y no de flecha, para que no tenga conflictos con el this.variable
//Logica para eliminar ciertos campos a la hora de dar las respuestas o manipular el objeto en codigo, como tal se usa para evitar enviar contraseñas 
//o informacion sensible de la base de datos
UsuarioSchema.methods.toJSON = function(){
    const {__v, password,_id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema)