const express = require('express')
var cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {

        }

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion

        this.routes()

        //sockets
        this.sockets();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json())

        //Directorio público
        this.app.use(express.static('public'))

        //Fileupload - carga de archivos
    }

    routes() {
        //this.app.use(this.paths.auth, require('../routes/auth'))
    }

    sockets() {
        this.io.on('connection', socketController)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Iniciada la aplicacion websocket en el puerto ${this.port}`)
        })
    }

}




module.exports = Server;