const mongoose = require('mongoose')
const path = require('path');
const routes = require('./routes/routes');
const cors = require('cors');
const express = require('express');
const http = require('http');

const app = express();
const PORT = 3000;

global.appRoot = path.resolve(__dirname);

mongoose.connect('mongodb://localhost:27017/workmatch');
routes(app);

app.use(express.json());
app.use(cors());

// manage errors
app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'});
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});