'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/* Creación de la estructura del modelo */
/* category -> sólo puede tener por valores computers, phone o accesories */
const ProductSchema = Schema({
    name: String,
    picture: String,
    price: { type: Number, default: 0},
    category: { type: String, enum: ['computers', 'phones', 'tablets']},
    description: String
})

/* Exportar el modelo. De esta manera el resto de la aplicación podrá acceder a este modelo. */
module.exports = mongoose.model('product', ProductSchema)

