const {Schema, model} = require('mongoose');

const uso_reactivoSchema = new Schema({
    reactivo_id: {
      type: Schema.Types.ObjectId,
      ref: 'reactivos'
    },
    duracion: Number, // Duración en horas
    cantidad_usos: Number,
    fechaInicio: Date
  });

  uso_reactivo = model('uso_reactivo', uso_reactivoSchema, 'uso_reactivo');

module.exports = uso_reactivo;