require('dotenv').config()
const express = require('express')
const cors = require('cors');
class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.interactionsPath = '/api/interactions'
        //Rutas de mi aplicacion
        this.routes();
    }
    middlewares(){
        //directorio publico
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use( express.json() )

        //Directorio publico
        this.app.use( express.static('public') )
    }

    routes(){
        this.app.use(this.interactionsPath, require('../routes/interactions.routes'))
    }

    listen(){
    this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }

}

module.exports = Server