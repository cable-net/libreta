const express = require('express')
const router = express.Router()
const Cliente = require('../models/cliente')
const Joi = require('@hapi/joi').extend(require('@joi/date'))

const schemaCliente = Joi.object({
  nombre: Joi.string().min(1).max(255).required(),
  paterno: Joi.string().min(3).max(255).required(),
  materno: Joi.string().min(3).max(255).required(),
  fechaNacimiento: Joi.date().format('YYYY-MM-DD HH:mm:ss').utc().required(),
  genero: Joi.string().valid('F', 'M').required(),
  curp: Joi.string().min(18).max(18).required(),
  email: Joi.string().min(2).max(255).required().email(),
  telefonoUno: Joi.string().min(10).max(10).required(),
  telefonoDos: Joi.string().min(10).max(10).required(),
  calle: Joi.string().min(4).max(255).required(),
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
      { error: error.details[0].message }
    )
  }

  const isEmailExist = await Cliente.findOne({ email: req.body.email })
  if (isEmailExist) {
    return res.status(400).json(
      { error: 'Este email ya existe' }
    )  
  }
  
  const cliente = new Cliente({
    nombre: req.body.nombre,
    paterno: req.body.paterno,
    materno: req.body.materno,
    fechaNacimiento: req.body.fechaNacimiento,
    genero: req.body.genero,
    curp: req.body.curp,
    email: req.body.email,
    telefonoUno: req.body.telefonoUno,
    telefonoDos: req.body.telefonoDos,
    calle: req.body.calle,
    numeroInt: req.body.numeroInt,
    numeroExt: req.body.numeroExt,
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
