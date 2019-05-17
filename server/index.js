require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const product_ctrl = require('./controllers/product_controller')

const {SERVER_PORT, CONNECTION_STRING} = process.env

massive(CONNECTION_STRING, {scripts: __dirname + '/db'})
.then(database => {
    app.set('db', database)
    console.log('Database connected')
    app.listen(SERVER_PORT, () => {
        console.log(`Working on port ${SERVER_PORT}`)
    })
})
.catch(err => {
    console.log(err)
})

app.get('/api/inventory', product_ctrl.get_products)
app.get('/api/product/:id', product_ctrl.get_product)

