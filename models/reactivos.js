const {Schema, model} = require('mongoose');

const reactivosSchema = new Schema({
	reactivo_nombre:   	    {type: String},
	reactivo_marca_id:   	{
        type: Schema.Types.ObjectId,
        ref: 'marcas_reactivos'
    },
});

reactivos = model('reactivos', reactivosSchema, 'reactivos');

module.exports = reactivos;