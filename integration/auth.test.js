const chai = require('chai')
const expect = chai.expect
const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const Cliente = require('../models/cliente')

describe('/ cliente POST', () => {
  before(async () => {
    // before each test delete all users table data
    await Cliente.deleteMany({})
  })

  after(async () => {
    mongoose.disconnect()
  })

  describe('Endpoint de registro', () => {
    it('deberia retornar un usuario con un id de registro en la BD', async () => {
      const cliente = {
        nombre: 'Salvador',
        paterno: 'Hernandez',
        materno: 'Olguin',
        fechaNacimiento: '2022-01-01',
        genero: 'M',
        email: 'a45srgh@gmail.com',
        telefonoUno: '7387252435',
        telefonoDos: '7712794678',
        calle: 'Francisco J. Mujica',
        numeroInt: '0',
        numeroExt: '24',
        referencia: 'Detras de la Secundaria David Noble, casa de color blanco, con negocio de papeleria',
        estado: 'Hidalgo',
        municipio: 'Mixquiahuala',
        colonia: 'Bondho',
        cp: '42700',
        paquete: 'Basico',
        tvs: '2'
      }
      const res = await request(app).post('/api/cliente').send(cliente)
      expect(res.status).to.equal(201)
      expect(res.body).to.have.include.keys('_id')
    })
  })
})
