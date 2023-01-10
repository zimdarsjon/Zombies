const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/zombie');

let scoreSchema = mongoose.Schema({
  name: String,
  score: Number
})

let scoreModel = mongoose.model('scores', scoreSchema);

module.exports = scoreModel;