const express = require('express');

let app = express();

app.use(express.static(__dirname + '/../public'));
app.use('/assets', express.static('assets'));

app.listen(3000, () => {
  console.log('Listening on Port 3000');
})