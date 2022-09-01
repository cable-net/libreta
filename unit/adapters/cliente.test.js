const chai = require('chai')
const expect = chai.expect
const adapter = require('../../adapters/cliente')

describe('Pruebas para el adapter de cliente: ', () => {
  describe('Adapter para post endpoint: ', () => {
    it('Deberia retornar un modelo de tipo cliente', () => {
      const body = {
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
      const [error, model] = adapter.bodyToModel(body)
      expect(error).to.equal(undefined)
      expect(model).to.deep.equal({
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
      })
    })
    it('Deberia retornar un error porque el curp no cumple con el formato', () => {
      const body = {
        nombre: 'Salvador',
        paterno: 'Hernandez',
        materno: 'Olguin',
        fechaNacimiento: '2007-02-22 10:30:33',
        genero: 'M',
        curp: 'GAOS780616H',
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
      const [error, model] = adapter.bodyToModel(body)
      expect(model).to.equal(undefined)
      expect(error.details[0].message).to.equal('"curp" length must be at least 18 characters long')
    })
  })
})
