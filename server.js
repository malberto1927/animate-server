'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 8080

// los callback son funciones que se ejecutan 
// despues de una operacion asyncrona
const server = http.createServer()

server.on('request', onRequest)
server.on('listening', onListening)

server.listen(port)
//un metodo asyncrono simpre lleva un callback
function onRequest(req, res){
	let fileName = path.join(__dirname, 'public', 'index.html')
	fs.readFile(fileName,function(err, file){
		if(err){
			return res.end(err.message)
		}
		res.end(file)
	})
}

function onListening(){
	console.log('Servidor escuchando en el puerto ' + port)
}