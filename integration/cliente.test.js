const chai = require('chai')
const expect = chai.expect
const request = require('supertest')
const mongoose = require('mongoose')
const sinon = require('sinon')

const app = require('../app')
const Cliente = require('../models/cliente')
const httpOut = require('../http-out/auth')
const sandbox = sinon.createSandbox()
const EMAIL_REGISTERED_OUT = 'raul@yahoo.com.mx'
const EMAIL_REGISTERED_USER_OUT = 'pedro@hotmail.com'

describe('/ cliente POST', () => {
  before(async () => {
    sandbox.stub(httpOut, 'emailRegistered').callsFake((email) => {
      return (email === EMAIL_REGISTERED_OUT)
    })
    sandbox.stub(httpOut, 'registerUsuario').callsFake((usuario) => {
      return (usuario.email !== EMAIL_REGISTERED_USER_OUT)
    })
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
        fechaNacimiento: '2007-02-22 10:30:33',
        genero: 'M',
        curp: 'GAOS780616HHGRLL07',
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
      const res = await request(app).post('/api/cliente').set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTVmZDEzODJlYWMwMmQ3NWI4ZGE3NCIsImlhdCI6MTY1OTIzOTcwMH0.AV5WVSIY63cRGMDcJEHFFHVuPiALwcJAJuSt3oS962o').send(cliente)
      expect(res.status).to.equal(201)
      expect(res.body).to.have.include.keys('_id')
    })

    it('deberia retornar un error porque el email ya existe', async () => {
      const cliente = {
        nombre: 'Pedroo',
        paterno: 'Hernandez',
        materno: 'Olguin',
        fechaNacimiento: '2007-02-22 10:30:33',
        genero: 'M',
        curp: 'GAOS780616HHGRLL08',
        email: 'a45srgh2@gmail.com',
        telefonoUno: '7387252454',
        telefonoDos: '7712795678',
        calle: 'Francisco J. Mujica',
        numeroInt: '01',
        numeroExt: '24',
        referencia: 'Detras de la Secundaria David Noble, casa de color blanco, con negocio de papeleria',
        estado: 'Hidalgo',
        municipio: 'Mixquiahuala',
        colonia: 'Bondho',
        cp: '42700',
        paquete: 'Basico',
        tvs: '2'
      }
      await request(app).post('/api/cliente').set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTVmZDEzODJlYWMwMmQ3NWI4ZGE3NCIsImlhdCI6MTY1OTIzOTcwMH0.AV5WVSIY63cRGMDcJEHFFHVuPiALwcJAJuSt3oS962o').send(cliente)
      const res = await request(app).post('/api/cliente').set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTVmZDEzODJlYWMwMmQ3NWI4ZGE3NCIsImlhdCI6MTY1OTIzOTcwMH0.AV5WVSIY63cRGMDcJEHFFHVuPiALwcJAJuSt3oS962o').send(cliente)
      expect(res.status).to.equal(400)
      expect(res.body.error).to.equal('Este email ya existe')
    })

    it('deberia retornar un error porque el CURP no cumplen con el formato', async () => {
      const cliente = {
        nombre: 'Salvador',
        paterno: 'Hernandez',
        materno: 'Olguin',
        fechaNacimiento: '2007-02-22 10:30:33',
        genero: 'M',
        curp: 'GAOS780616HHGRLL0',
        email: 'a45srgh12@gmail.com',
        telefonoUno: '7387252435',
        telefonoDos: '7718777777',
        calle: 'Francisco J. Mujica',
        numeroInt: '0',
        numeroExt: '24',
        referencia: 'Detras de la Secundaria David Noble, casa de color blanco, con negocio de papeleria',
        estado: 'Hidalgo',
        municipio: 'Mixquiahuala',
        colonia: 'Bondho',
        cp: '42708',
        paquete: 'Basico',
        tvs: '2'
      }
      const res = await request(app).post('/api/cliente').set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTVmZDEzODJlYWMwMmQ3NWI4ZGE3NCIsImlhdCI6MTY1OTIzOTcwMH0.AV5WVSIY63cRGMDcJEHFFHVuPiALwcJAJuSt3oS962o').send(cliente)
      expect(res.status).to.equal(400)
      expect(res.body.error).to.equal('"curp" length must be at least 18 characters long')
    })
    it('deberia retornar un error porque el email ya existe', async () => {
      const cliente = {
        nombre: 'Pedroo',
        paterno: 'Hernandez',
        materno: 'Olguin',
        fechaNacimiento: '2007-02-22 10:30:33',
        genero: 'M',
        curp: 'GAOS780616HHGRLL08',
        email: 'a45srgh2@gmail.com',
        telefonoUno: '7387252454',
        telefonoDos: '7712795678',
        calle: 'Francisco J. Mujica',
        numeroInt: '01',
        numeroExt: '24',
        referencia: 'Detras de la Secundaria David Noble, casa de color blanco, con negocio de papeleria',
        estado: 'Hidalgo',
        municipio: 'Mixquiahuala',
        colonia: 'Bondho',
        cp: '42700',
        paquete: 'Basico',
        tvs: '2'
      }
      await request(app).post('/api/cliente').set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTVmZDEzODJlYWMwMmQ3NWI4ZGE3NCIsImlhdCI6MTY1OTIzOTcwMH0.AV5WVSIY63cRGMDcJEHFFHVuPiALwcJAJuSt3oS962o').send(cliente)
      const res = await request(app).post('/api/cliente').set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTVmZDEzODJlYWMwMmQ3NWI4ZGE3NCIsImlhdCI6MTY1OTIzOTcwMH0.AV5WVSIY63cRGMDcJEHFFHVuPiALwcJAJuSt3oS962o').send(cliente)
      expect(res.status).to.equal(400)
      expect(res.body.error).to.equal('Este email ya existe')
    })

    it('deberia retornar un error porque el Genero no es el especificado', async () => {
      const cliente = {
        nombre: 'Salvador',
        paterno: 'Hernandez',
        materno: 'Olguin',
        fechaNacimiento: '2007-02-22 10:30:33',
        genero: 'Mujer',
        curp: 'GAOS780616HHGRLL0',
        email: 'a45srgh12@gmail.com',
        telefonoUno: '7387252435',
        telefonoDos: '7718777777',
        calle: 'Francisco J. Mujica',
        numeroInt: '0',
        numeroExt: '24',
        referencia: 'Detras de la Secundaria David Noble, casa de color blanco, con negocio de papeleria',
        estado: 'Hidalgo',
        municipio: 'Mixquiahuala',
        colonia: 'Bondho',
        cp: '42708',
        paquete: 'Basico',
        tvs: '2'
      }
      const res = await request(app).post('/api/cliente').set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTVmZDEzODJlYWMwMmQ3NWI4ZGE3NCIsImlhdCI6MTY1OTIzOTcwMH0.AV5WVSIY63cRGMDcJEHFFHVuPiALwcJAJuSt3oS962o').send(cliente)
      expect(res.status).to.equal(400)
      expect(res.body.error).to.equal('"genero" must be one of [F, M]')
    })

    it('deberia retornar un error porque el email ya cuenta con un usuario', async () => {
      const cliente = {
        nombre: 'Salvador',
        paterno: 'Hernandez',
        materno: 'Olguin',
        fechaNacimiento: '2007-02-22 10:30:33',
        genero: 'M',
        curp: 'GAOS780616HHGRLL07',
        email: EMAIL_REGISTERED_OUT,
        telefonoUno: '7387252435',
        telefonoDos: '7718777777',
        calle: 'Francisco J. Mujica',
        numeroInt: '0',
        numeroExt: '24',
        referencia: 'Detras de la Secundaria David Noble, casa de color blanco, con negocio de papeleria',
        estado: 'Hidalgo',
        municipio: 'Mixquiahuala',
        colonia: 'Bondho',
        cp: '42708',
        paquete: 'Basico',
        tvs: '2'
      }
      const res = await request(app).post('/api/cliente').set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTVmZDEzODJlYWMwMmQ3NWI4ZGE3NCIsImlhdCI6MTY1OTIzOTcwMH0.AV5WVSIY63cRGMDcJEHFFHVuPiALwcJAJuSt3oS962o').send(cliente)
      expect(res.status).to.equal(400)
      expect(res.body.error).to.equal('Este email ya tiene usuario')
    })

    it('deberia retornar un error porque el cliente esta parcialmente almacenado', async () => {
      const cliente = {
        nombre: 'Salvador',
        paterno: 'Hernandez',
        materno: 'Olguin',
        fechaNacimiento: '2007-02-22 10:30:33',
        genero: 'M',
        curp: 'GAOS780616HHGRLL07',
        email: EMAIL_REGISTERED_USER_OUT,
        telefonoUno: '7387252435',
        telefonoDos: '7718777777',
        calle: 'Francisco J. Mujica',
        numeroInt: '0',
        numeroExt: '24',
        referencia: 'Detras de la Secundaria David Noble, casa de color blanco, con negocio de papeleria',
        estado: 'Hidalgo',
        municipio: 'Mixquiahuala',
        colonia: 'Bondho',
        cp: '42708',
        paquete: 'Basico',
        tvs: '2'
      }
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTVmZDEzODJlYWMwMmQ3NWI4ZGE3NCIsImlhdCI6MTY1OTIzOTcwMH0.AV5WVSIY63cRGMDcJEHFFHVuPiALwcJAJuSt3oS962o'
      const res = await request(app).post('/api/cliente').set('auth-token', token).send(cliente)
      expect(res.status).to.equal(400)
      expect(res.body.error).to.equal('Informacion almacenada parcialmente')
    })
  })
})
