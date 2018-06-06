'use strict'

/* Mongoose - librería para poder acceder a la base de datos */
const mongoose = require("mongoose")

const app = require('./app')

const config = require('./config')

mongoose.connect(config.db, (err, res) => {
    if(err) {
        return console.log(`Error al conectar a la base de datos. ${err}`);
    }
    console.log("Conexión a la base de datos establecida...")

    /* Poner a escuchar en el puerto 3000 */
    app.listen(config.port, () => {
        console.log(`API REST corriendo en http://localhost:${config.port}`);
    })
})


