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
	let url = req.url
	
	if(url.startsWith('/index') || url === '/'){
		return serveIndex(res)
	}

	if(url === '/app.js'){
		return serveApp(res)
	}

	res.statusCode = 404
	res.end(`404 not found: ${url}`)
}

function serveIndex(res){
	let index = path.join(__dirname, 'public', 'index.html')
	
	res.setHeader('Content-Type','text/html')
	let rs = fs.createReadStream(index)

	rs.pipe(res)

	rs.on('error', function(err){
		res.setHeader('Content-Type','text/plain')
		res.end(err.message)
	})
}

function serveApp(res){
	let app = path.join(__dirname, 'public', 'app.js')
	
	res.setHeader('Content-Type','text/javascript')
	let rs = fs.createReadStream(app)

	rs.pipe(res)

	rs.on('error', function(err){
		res.setHeader('Content-Type','text/plain')
		res.end(err.message)
	})
}

function onListening(){
	console.log(`Servidor escuchando en el puerto ${port}`)
}