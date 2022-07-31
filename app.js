const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

require('dotenv').config()

const app = express()
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.d7vx9.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri, options).then(
  () => { console.warn('Base de datos conectada') },
  error => { console.warn('error db:', error) }
)

const healthRoutes = require('./routes/health')
const clienteRoutes = require('./routes/cliente')
const verifyToken = require('./routes/validate-token')

app.use('/api/cliente', verifyToken, clienteRoutes)
app.use('/api/health/', healthRoutes)
app.use('/api/cliente', clienteRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.warn(`server running on: ${PORT}`)
})

module.exports = app
