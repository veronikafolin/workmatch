const express = require('express');
const app = express();
const mongoose = require('mongoose')
const path = require('path');
const routes = require('./routes/routes');
const cors = require('cors');
const constants = require('../constants');

global.appRoot = path.resolve(__dirname);

var PORT = 3000;

console.log(__dirname)

app.use('/static', express.static(constants.FRONTEND_PATH)); 

mongoose.connect('mongodb://localhost:27017/DegreeWork');
routes(app);

app.use(express.json());
app.use(cors())

app.use((req, res)=> {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})