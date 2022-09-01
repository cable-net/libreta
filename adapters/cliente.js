const Joi = require('@hapi/joi').extend(require('@joi/date'))

const USER_TYPE_COLABORADOR = 'colaborador'
const PASSWORD_DEFAULT = 'D3fault#'

const clienteSchema = Joi.object({
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

module.exports.bodyToModel = function (body) {
  const { error } = clienteSchema.validate(body)
  if (error) {
    return [error]
  }

  const cliente = {
    nombre: body.nombre,
    paterno: body.paterno,
    materno: body.materno,
    fechaNacimiento: body.fechaNacimiento,
    genero: body.genero,
    curp: body.curp,
    email: body.email,
    telefonoUno: body.telefonoUno,
    telefonoDos: body.telefonoDos,
    calle: body.calle,
    numeroInt: body.numeroInt,
    numeroExt: body.numeroExt,
    referencia: body.referencia,
    estado: body.estado,
    municipio: body.municipio,
    colonia: body.colonia,
    cp: body.cp,
    paquete: body.paquete,
    tvs: body.tvs
  }
  return [error, cliente]
}

module.exports.colaboradorToUsuario = function (colaborador) {
  return {
    email: colaborador.email,
    password: PASSWORD_DEFAULT,
    user_id: colaborador._id,
    user_type: USER_TYPE_COLABORADOR,
    role: colaborador.tipoColaborador
  }
}
