'use strict'

const express = require('express')
const api = express.Router();

const Product = require("../models/product")

/* Peticion a api rest 
Obtener todos los productos */
api.get('/product', (req, res) => {
    // Se le pasa un objeto vacío, significa que nos busque todo
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({message: `Error al intentar obtener el producto ${err}`})
        if (!products) return res.status(404).send({message: "No existe el producto"})
        res.status(200).send({products: products})
    })
})

// Obtener un producto
api.get('/product/:productId', (req, res) => {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: `Error al intentar obtener el producto ${err}`})
        if (!productId) return res.status(404).send({message: `El producto no existe`})
        res.status(200).send({product: product})
    })
})

// Enviar / guardar un producto
api.post('/product', (req, res) => {
    console.log('POST /api/product')
    console.log(req.body)

    let product = new Product()
    // Gracias a bodyParser, ya viene parseado, ya viene como objeto json y podemos acceder a cada propiedad.
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    /* Cuando se almacene por defecto mongodb le va a añadir un id. 
    Para guardar el objeto. Como es un objeto de mongoose, ya tiene acceso a las funciones de mongodb */ 
    product.save((err, productStored) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos ${err}`})

        res.status(200).send({product: productStored})
    })
})

// Actualizar un producto
api.put('/product/:productId', (req, res) => {
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpt) => {
        if (err) return res.status(500).send({message: `Error al actualizar el producto ${err}`})
        
        res.status(200).send({product: update})
    })
})

// Borrar un producto
api.delete('/product/:productId', (req, res) => {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) res.status(500).send({message: `Error al borrar el producto ${err}`})
        product.remove(err => {
            if (err) res.status(500).send({message: `Error al borrar el producto ${err}`})
            res.status(200).send({message: "El producto ha sido eliminado"})
        })
    })
})

module.exports = api;