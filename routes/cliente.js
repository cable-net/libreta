const express = require('express')
const router = express.Router()
const Cliente = require('../models/cliente')
const Joi = require('@hapi/joi').extend(require('@joi/date'))

const schemaCliente = Joi.object({
  nombre: Joi.string().min(6).max(255).required(),
  paterno: Joi.string().min(6).max(255).required(),
  materno: Joi.string().min(6).max(255).required(),
  fechaNacimiento: Joi.date().format('YYYY-MM-DD HH:mm:ss').utc().required(),
  genero: Joi.string().valid('F', 'M').required(),
  email: Joi.string().min(6).max(255).required().email(),
  telefonoUno: Joi.string().min(12).max(12).required(),
  telefonoDos: Joi.string().min(12).max(12).required(),
  calle: Joi.string().min(6).max(255).required(),
  numeroInt: Joi.string().min(1).max(10).required(),
  numeroExt: Joi.string().min(1).max(10).required(),
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
    fechaNacimiento: req.body.fechana,
    genero: req.body.genero,
    email: req.body.email,
    telefonoUno: req.body.teluno,
    telefonoDos: req.body.teldos,
    calle: req.body.calle,
    numeroInt: req.body.numeroint,
    numeroExt: req.body.numeroext,
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
