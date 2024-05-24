const {Schema, model} = require('mongoose');

const marcas_reactivoSchema = new Schema({
	marca_reactivo_nombre: {type: String},
});

marcas_reactivo  = model('marcas_reactivo', marcas_reactivoSchema, 'marcas_reactivo');

module.exports = marcas_reactivo;