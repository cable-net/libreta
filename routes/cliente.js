const express = require('express')
const router = express.Router()
const Cliente = require('../models/cliente')
const adapter = require('../adapters/cliente')
const httpOut = require('../http-out/auth')

router.get('/:id', async (req, res) => {
  const isIdExist = await Cliente.findOne({ _id: req.params.id })
  if (isIdExist) {
    return res.status(200).json(isIdExist)
  } else {
    return res.status(404).json(
      { error: 'Este id no se encuentra' }
    )
  }
})

router.get('/name/:nombre/like', async (req, res) => {
  if (req.params.nombre.length < 3) {
    return res.status(400).json({ error: 'Caracteres insuficientes para la busqueda' })
  }
  const clientesPorNombre = await Cliente.find({ nombre: { $regex: new RegExp(req.params.nombre, 'i') } })
  const resultado = clientesPorNombre.map(cliente => (
    {
      id: cliente._id,
      nombre: cliente.nombre,
      segundoNombre: cliente.segundoNombre,
      paterno: cliente.paterno,
      materno: cliente.materno
    }

  ))
  return res.status(200).json(resultado)
})

router.post('/', async (req, res) => {
  const [error, model] = adapter.bodyToModel(req.body)
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
  const isEmailExistOut = await httpOut.emailRegistered(req.body.email, req.header('auth-token'))
  if (isEmailExistOut) {
    return res.status(400).json(
      { error: 'Este email ya tiene usuario' }
    )
  }

  const cliente = new Cliente(model)
  try {
    const savedCliente = await cliente.save()
    const usuario = adapter.clienteToUsuario(savedCliente)
    const isUserRegistered = await httpOut.registerUsuario(usuario, req.header('auth-token'))
    if (!isUserRegistered) {
      return res.status(400).json(
        { error: 'Informacion almacenada parcialmente' }
      )
    }
    res.status(201).json(savedCliente)
  } catch (error) {
    res.status(400).json({ error })
  }
})

module.exports = router
