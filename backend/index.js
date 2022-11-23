const express = require('express');
const app = express();

var PORT = 3000;

app.use(express.json());

app.use((req, res)=> {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})