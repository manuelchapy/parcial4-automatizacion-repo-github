const faker = require('faker'); // Asegúrate de instalar faker con npm install faker
require('./database');
const reactivoModel = require("../models/reactivos.model");
const marcaModel = require("../models/marcas_reactivo.model");

async function crearReactivoMarcas() {
  for (let i = 1; i <= 3; i++) {
    const reactivo = new reactivoModel({
        marca_reactivo_nombre: `Marca de Reactivo #${i}`
    });
    await reactivo.save();
  }
  console.log(' Marca de Reactivos creados.');
}

async function crearReactivos() {
    for (let i = 1; i <= 20; i++) {
      const reactivo = new Reactivo({
        nombre: `Reactivo #${i}`
      });
      await reactivo.save();
    }
    console.log('Reactivos creados.');
  }

async function generarUsoReactivos() {
  const reactivos = await reactivoModel.find();
  const fechaActual = new Date();

  for (const reactivo of reactivos) {
    const duracion = faker.random.number({ min: 1, max: 48 }); // Duración en horas entre 1 y 48
    const fechaInicio = new Date(fechaActual);
    fechaInicio.setHours(fechaActual.getHours() - duracion);

    const usoReactivo = new UsoReactivo({
      reactivoId: reactivo._id,
      duracion,
      fechaInicio
    });

    await usoReactivo.save();
  }

  console.log('Datos de uso de reactivos generados.');
}

async function main() {
  await crearReactivoMarcas();
  //await crearReactivos();
  //await generarUsoReactivos();
}

main();