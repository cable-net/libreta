const express = require('express')
const router = express.Router()
const Cliente = require('../models/cliente')
const adapter = require('../adapters/cliente')
const httpOut = require('../http-out/auth')

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
    const usuario = adapter.colaboradorToUsuario(savedCliente)
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
