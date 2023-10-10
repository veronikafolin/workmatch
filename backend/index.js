const express = require('express');
const app = express();
const mongoose = require('mongoose')
const path = require('path');
const routes = require('./routes/routes');
const cors = require('cors');

global.appRoot = path.resolve(__dirname);

const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/workmatch');
routes(app);

app.use(express.json());
app.use(cors());

// manage errors
app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'});
});

// start server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});