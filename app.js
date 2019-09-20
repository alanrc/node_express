// Servidor Web hecho con Express
const express =  require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const handlebars = require('nodemailer-express-handlebars')

const server = express()

const miniThunderbird = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: 'boris11@ethereal.email',
		pass: 'SBMqfaY6XeWZrVpHxb'
	}
})

// Con nodemailer-express-handlebars
const render = {
	extName: '.hbs',
	viewPath: 'template/',
	viewEngine: {
		partialsDir: 'template/',
		layoutsDir: 'template/',
		defaultLayout: false,
		extName: '.hbs'
	}
}

miniThunderbird.use('compile', handlebars(render))
// ----------------  end handlebars  ---------------------


miniThunderbird.verify((error, ok) => {
	// let mensaje = if (error) {'Ahhhh'} else {'viva..'}
	let mensaje = error ? 'EXPRESS' : 'PYTHON..:).'
	console.log(mensaje);
})

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
	let datos = req.body
	miniThunderbird.sendMail({
		from: datos.correo, // <--  Quien envia la consulta
		to: 'alan15lvs@gmail.com',  // <--  Quien recibe la consulta
		replyTo: datos.correo, // <--  A quien responder la consulta
		subject: datos.asunto, // <--  Asunto de la consulta
		// html: `<p>Consulta de ${datos.nombre}<br><br>${datos.mensaje}</p>` // <--  Mensaje / Consulta
		// ---------------------------------------------
		template: 'bienvenido',
		context: {
			// nombre: 'Python',
			// correo: 'python@gmail.com',
			// asunto: 'Node - Python)',
			// mensaje: 'Los templates son similares a python-django'
			
			// De manera dinamica
			nombre: datos.nombre,
			correo: datos.correo,
			asunto: datos.asunto,
			mensaje: datos.mensaje
		}
	}, function(error, ok){
		if (!error) {
			miniThunderbird.sendMail({
				from: 'no-reply@supersitio.com',
				to: datos.correo,
				subject: 'Gracias por su mensaje :)',
				html: `<h1>Responderé a la brevedad posible.</h1>`
			})
		}
	})

	res.json(req.body)
})