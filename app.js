'use strict'

// Para poder utilizar nuevas funcionalidades de ECMASCRIPT 6
// nuevos tipos de variables ... usar import

/* Como estamos usando NodeJS sin transpiler, se van a importar 
los módulos con require() 
 Va a leer express de la carpeta node-modules y lo va a importar */
 const express = require('express')
 
 /* Middleware (cada que se le añade a express).
 Cada vez que se realice una petición http, va a pasar por esta capa.
 Sirve para parsear el cuerpo de las peticiones http, al parsearlos 
 Node los puede tratar, manipular... */
 const bodyParser = require("body-parser")

 const path = require('path');

 /* Para crear el servidor, se crea una variable que llame a express */
const app = express()

/* Llamar al api. No hace falta indicar 
el nombre del fichero porque es index.js*/
const api = require('./routes')
const routes = require('./routes')

/* Comun en cualquier aplicación de Node que utilice express y body-parser. 
Con el método use se le añaden estas capas a la app de express*/
app.use(bodyParser.urlencoded({ extended: false }))
// Para poder admitir peticiones con cuerpo de mensaje en formato json
app.use(bodyParser.json())

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use('/api', api)
app.use('/routes', routes)

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

module.exports = app