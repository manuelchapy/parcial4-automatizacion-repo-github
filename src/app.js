const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 3000);

// middlewares
app.use(express.urlencoded({extended: false}));	
app.use(cors());
app.use(express.json());

app.use(require('./routes/dashboard.route'));

module.exports = app;