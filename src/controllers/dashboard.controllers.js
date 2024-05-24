const dashboardCtrl = {};
const { faker } = require('@faker-js/faker'); // Asegúrate de instalar faker con npm install faker
const reactivoModel = require("../../models/reactivos");
const marcaModel = require("../../models/marcas_reactivo");
const usoReactivoModel = require("../../models/uso_reacticos")

dashboardCtrl.home = async (req, res) => {
  res.send('OLA K ASE');
};

dashboardCtrl.createData = async (req, res) => {
  await crearReactivoMarcas();
  await crearReactivos();
  await generarUsoReactivos();
  console.log(marcaModel)
  async function crearReactivoMarcas() {
    for (let i = 1; i <= 3; i++) {
      let reactivoMarca = new marcaModel({
        marca_reactivo_nombre: `Marca de Reactivo #${i}`
      });
      let guardado = await reactivoMarca.save();
      console.log(guardado)
    }
    console.log(' Marca de Reactivos creados.');
  }

  async function crearReactivos() {
    let marcas_reactivo = await marcaModel.find()
    for (let i = 0; i <= 2; i++) {
      const reactivo = new reactivoModel({
        reactivo_nombre: `Reactivo #${i + 1}`,
        reactivo_marca_id: marcas_reactivo[i]._id
      });
      await reactivo.save();
    }
    console.log('Reactivos creados.');
  }

  async function generarUsoReactivos() {
    const reactivos = await reactivoModel.find();
    const fechaActual = new Date();

    for (let i = 0; i < 500; i++) {
      const duracion = faker.datatype.number({ min: 48, max: 72 }); // Duración en horas entre 1 y 48
      const fechaInicio = new Date(fechaActual);
      if (duracion >= 48 && duracion <= 58) {
        console.log("entro entre 48 a 58", reactivos[0]._id)
        fechaInicio.setHours(fechaActual.getHours() - duracion);
        const usoReactivo = new usoReactivoModel({
          reactivo_id: reactivos[0]._id,
          duracion: duracion,
          cantidad_usos: faker.datatype.number({ min: 70, max: 100 }),
          fechaInicio: fechaInicio
        });
        await usoReactivo.save();
      } else if (duracion >= 59 && duracion <= 69) {
        console.log("entro entre 59 a 69", reactivos[1]._id)
        fechaInicio.setHours(fechaActual.getHours() - duracion);
        const usoReactivo = new usoReactivoModel({
          reactivo_id: reactivos[1]._id,
          duracion: duracion,
          cantidad_usos: faker.datatype.number({ min: 101, max: 150 }),
          fechaInicio: fechaInicio
        });
        await usoReactivo.save();
      } else if (duracion >= 70) {
        console.log("entro mayor a 70", reactivos[2]._id)
        fechaInicio.setHours(fechaActual.getHours() - duracion);
        const usoReactivo = new usoReactivoModel({
          reactivo_id: reactivos[2]._id,
          duracion: duracion,
          cantidad_usos: faker.datatype.number({ min: 150, max: 170 }),
          fechaInicio: fechaInicio
        });
        await usoReactivo.save();
      }
    }

    console.log('Datos de uso de reactivos generados.');
  }
  res.send(
    "listo!"
  )
}

dashboardCtrl.conteoCantidadDeUsosMarca = async (req, res) => {
  let reactivos = await reactivoModel.find()
  let marca_reactivos = await marcaModel.find()
  let usoReactivos = await usoReactivoModel.find()
  let i = 0;
  for(const reactivo of reactivos){
    if(reactivo.reactivo_marca_id.toString() ===  marca_reactivos[i]._id.toString()){
      reactivo.reactivo_nombre = `${reactivo.reactivo_nombre} / ${marca_reactivos[i].marca_reactivo_nombre}`
    }
    i++
  }
  reactivos = reactivos.map(reactivo => ({
    ...reactivo.toObject(),
    sum_uso_cantidad: 0
  }));
  for (const reactivo of reactivos) {
    for (uso of usoReactivos) {
      if (reactivo._id.toString() === uso.reactivo_id.toString()) {
        reactivo.sum_uso_cantidad += uso.cantidad_usos;
      }
    }
  }
  let arrayCompilado = {
    nombres_reactivo: [],
    usos_por_reactivo: []
  }
  for(const reactivo of reactivos){
    arrayCompilado.nombres_reactivo.push(reactivo.reactivo_nombre)
    arrayCompilado.usos_por_reactivo.push(reactivo.sum_uso_cantidad)
  }
  res.send(arrayCompilado)
}

dashboardCtrl.conteoCantidadDeTiempoMarca = async (req, res) => {
  let reactivos = await reactivoModel.find()
  let marca_reactivos = await marcaModel.find()
  let usoReactivos = await usoReactivoModel.find()
  let i = 0;
  for(const reactivo of reactivos){
    if(reactivo.reactivo_marca_id.toString() ===  marca_reactivos[i]._id.toString()){
      reactivo.reactivo_nombre = `${reactivo.reactivo_nombre} / ${marca_reactivos[i].marca_reactivo_nombre}`
    }
    i++
  }
  reactivos = reactivos.map(reactivo => ({
    ...reactivo.toObject(),
    sum_tiempo_duracion: 0
  }));
  for (const reactivo of reactivos) {
    for (uso of usoReactivos) {
      if (reactivo._id.toString() === uso.reactivo_id.toString()) {
        reactivo.sum_tiempo_duracion += uso.duracion;
      }
    }
  }
  let arrayCompilado = {
    nombres_reactivo: [],
    tiempo_por_reactivo: []
  }
  for(const reactivo of reactivos){
    arrayCompilado.nombres_reactivo.push(reactivo.reactivo_nombre)
    arrayCompilado.tiempo_por_reactivo.push(reactivo.sum_tiempo_duracion)
  }
  res.send(arrayCompilado)
}

dashboardCtrl.deconstrucciondataGraficoUsoTiempo = async (req, res) => {
  let reactivos = await reactivoModel.find()
  let marca_reactivos = await marcaModel.find()
  let duracionReactivos = await usoReactivoModel.find().sort({ duracion: 1 }).select('duracion -_id');
  let usoReactivos = await usoReactivoModel.find()
  let duracionReactivosVector = duracionReactivos.map(({duracion}) => duracion)
  duracionReactivosVector = [...new Set(duracionReactivosVector)]
  let i = 0;
  for(const reactivo of reactivos){
    if(reactivo.reactivo_marca_id.toString() ===  marca_reactivos[i]._id.toString()){
      reactivo.reactivo_nombre = `${reactivo.reactivo_nombre} / ${marca_reactivos[i].marca_reactivo_nombre}`
    }
    i++
  }
  
  //filtrar usos por tiempo
  let dataGrafico = {series: []}
  for(const reactivo of reactivos){
    let data = [];
    for(const tiempo of duracionReactivosVector){
      for(const uso of usoReactivos){
          if((uso.duracion == tiempo) && (reactivo._id.toString() == uso.reactivo_id.toString())){
            data.push(uso.cantidad_usos)
          }
      }
    }
    dataGrafico.series.push({reactivo_nombre: reactivo.reactivo_nombre}, {data: data})
  }
  //eliminar_pagos.map(({id_registro_pago}) => [id_registro_pago])
  //console.log(usoReactivos)
  //console.log(duracionReactivosVector)
  res.send(dataGrafico)
}

module.exports = dashboardCtrl;