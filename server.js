'use strict'

const http = require('http')
const router = require('./router')
const port = process.env.PORT || 8080

// los callback son funciones que se ejecutan 
// despues de una operacion asyncrona
const server = http.createServer()

server.on('request', router)
server.on('listening', onListening)

server.listen(port)

function onListening(){
	console.log(`Servidor escuchando en el puerto ${port}`)
}