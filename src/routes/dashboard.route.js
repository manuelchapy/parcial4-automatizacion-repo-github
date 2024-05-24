const { Router } = require('express');
const ctrlDashboard = require('../controllers/dashboard.controllers');
const dashboardCtrl = require('../controllers/dashboard.controllers');
const router = Router();

router.route('/dashboard')
		.get(dashboardCtrl.home)

router.route('/createData')
		.get(dashboardCtrl.createData)

router.route('/conteoCantidadDeUsosMarca')
		.get(dashboardCtrl.conteoCantidadDeUsosMarca)

router.route('/conteoCantidadDeTiempoMarca')
		.get(dashboardCtrl.conteoCantidadDeTiempoMarca)

router.route('/deconstrucciondataGraficoUsoTiempo')
		.get(dashboardCtrl.deconstrucciondataGraficoUsoTiempo)


module.exports = router;