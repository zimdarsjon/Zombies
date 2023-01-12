const express = require('express');
const controller = require('./database/controller.js');

let app = express();

app.use(express.static(__dirname + '/../public'));
app.use('/assets', express.static('assets'));

app.post('/score', controller.saveScore);
app.get('/score', controller.topScores);

app.listen(3000, () => {
  console.log('Listening on Port 3000');
})