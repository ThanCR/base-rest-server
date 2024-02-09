const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 8080;

class Server {

    constructor() {
        this.app = express()
        this.port = 8080
        this.interactionsPath = '/api/interaction'

        //loading middlewares
        this.middlewares();
        this.routes();
    }

    middlewares() {

        //parsear requests en formato JSON
        this.app.use(bodyParser.json())

        this.app.use(cors())

        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.interactionsPath, require('../routes/interaction.routes'))
    }

    listen(){
        this.app.listen(port, ()=>{
            console.log(`API currently running on port : ${port}`)
        })
    }

}

module.exports = Server