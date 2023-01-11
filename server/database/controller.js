const scoreModel = require('./db.js');


const saveScore = (req, res) => {
  let newScore = new scoreModel(req.query);
  newScore.save((err, doc) => {
    scoreModel.find().sort({score: -1}).limit(5)
    .then(results => res.send(results))
  })
}

const topScores = (req, res) => {
  scoreModel.find().sort({score: -1}).limit(5)
    .then(results => res.send(results))
}

exports.topScores = topScores;
exports.saveScore = saveScore;