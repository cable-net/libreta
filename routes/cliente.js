const express = require('express')
const router = express.Router()
const Cliente = require('../models/cliente')
const Joi = require('@hapi/joi').extend(require('@joi/date')); 

const schemaCliente = Joi.object({
  nombre: Joi.string().min(6).max(255).required(),
  paterno: Joi.string().min(6).max(255).required(),
  materno: Joi.string().min(6).max(255).required(),
  fechana: Joi.date().format('YYYY-MM-DD HH:mm:ss').utc().required(),
  genero: Joi.string().valid('F','M').required(),
  email: Joi.string().min(6).max(255).required().email(),
  teluno: Joi.string().min(12).max(12).required(),
  teldos: Joi.string().min(12).max(12).required(),
  calle: Joi.string().min(6).max(255).required(),
  numeroint: Joi.string().min(1).max(10).required(),
  numeroext: Joi.string().min(1).max(10).required(),
  referencia: Joi.string().min(6).max(600).required(),
  estado: Joi.string().valid('Hidalgo', 'otro').required(),
  municipio: Joi.string().valid('Mixquiahuala', 'otro').required(),
  colonia: Joi.number().valid('Bondho', 'otro').required(),
  cp: Joi.string().min(5).max(5).required(),
  paquete: Joi.string().valid('Basico', 'Intermedio', 'Total').required(),
  tvs: Joi.number().min(1).max(3).required()
})

router.post('/', async (req, res) => {
  const { error } = schemaCliente.validate(req.body)
  if (error) {
    return res.status(400).json(
      { error: 'Datos invalidos' }
    )
  }
  const cliente = new Cliente({
    nombre: req.body.nombre,
    paterno: req.body.paterno,
    materno: req.body.materno,
    fechana: req.body.fechana,
    genero: req.body.genero,
    email: req.body.email,
    teluno: req.body.teluno,
    teldos: req.body.teldos,
    calle: req.body.calle,
    numeroint: req.body.numeroint,
    numeroext: req.body.numeroext,
    referencia: req.body.referencia,
    estado: req.body.estado,
    municipio: req.body.municipio,
    colonia: req.body.colonia,
    cp: req.body.cp,
    paquete: req.body.paquete,
    tvs: req.body.tvs
  })
  try {
    const savedCliente = await cliente.save()
    res.status(201).json(savedCliente)
  } catch (error) {
    res.status(400).json({ error })
  }
})

module.exports = router
