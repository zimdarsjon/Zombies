const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DBCONNECT); //'mongodb://localhost/zombie'

let scoreSchema = mongoose.Schema({
  name: String,
  score: Number
})

let scoreModel = mongoose.model('scores', scoreSchema);

module.exports = scoreModel;