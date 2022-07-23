const { string } = require('@hapi/joi')
const mongoose = require('mongoose')

const clienteSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  paterno: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  materno: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  fechana: {
    type: Date,
    required: true,
  },
  genero: {
    type: String,
    required: true,
    enum: ['M', 'F']
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  teluno: {
    type: String,
    required: true,
    min: 12,
    max: 12
  },
  teldos: {
    type: String,
    required: true,
    min: 12,
    max: 12
  },
  calle: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  numeroint: {
    type: String,
    required: true,
    min: 1,
    max: 10
  },
  numeroext: {
    type: String,
    required: true,
    min: 1,
    max: 10
  },
  referencia: {
    type: String,
    required: true,
    min: 6,
    max: 600
  },
  estado: {
    type: String,
    required: true,
    enum: ['Hidalgo', 'Otro']
  },
  municipio: {
    type: String,
    required: true,
    enum: ['Mixquiahuala', 'Otro']
  },
  colonia: {
    type: String,
    required: true,
    enum: ['Bondho', 'Otro']
  },
  cp: {
    type: String,
    required: true,
    min: 5,
    max: 5
  },
  paquete: {
    type: String,
    required: true,
    enum: ['Basico', 'Intermedio', 'Total']
  },
  tvs: {
    type: Number,
    required: true,
    min: 1,
    max: 3
  }
})

module.exports = mongoose.model('Cliente', clienteSchema)