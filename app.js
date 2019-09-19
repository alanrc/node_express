// Servidor Web hecho con Express
const express =  require('express')
const bodyParser = require('body-parser')

const server = express()

const port = process.env.PORT || 2000

server.listen(port)

server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())


// server.get('/', (req, res) => { // Resumido.....
server.get('/', function(request, response){
	// response.end('<h1>Hola desde express..</h1>')
	response.sendFile(__dirname + '/index.html')
})

server.get('/noticias', (request, response) => {
	const noticias = [
		{titulo: 'Aprendiendo Express', autor: 'Alain', detalle: 'En desarrollo'},
		{titulo: 'Olvidando sinple node.js', autor: 'Alain', detalle: 'hasta pront simple node'}
	]
	response.json(noticias)
})

server.post('/enviar', (req, res) => {
	console.log(req.body.correo)
	res.json(req.body)
})