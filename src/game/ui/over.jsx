import React from 'react';
import Scores from './scores.jsx';
const axios = require('axios');

const {useEffect, useState} = React;

const Over = ({kills, game, scores, updateScores}) => {
  let [submit, updateSubmit] = useState(false);
  let [name, updateName] = useState('');

  useEffect(() => {
    let highscore = true;
    if (scores.length > 0 && scores[scores.length - 1].score > kills) {
      highscore = false;
    }
    updateSubmit(highscore);
  }, [kills])

  return (
    <div className='gameover'>
      <div className='container'>
      <h2>Game Over</h2>
      <h3>Score: {kills}</h3>
      <button onClick={e => {
        e.preventDefault();
        game.restart();
      }}>Restart</button>

      <Scores scores={scores}/>
      {submit &&
      <form>
        <h3>New High Score</h3>
        <input type='text' onChange={e => {
          updateName(e.target.value);
        }}></input>
        <button onClick={e => {
          e.preventDefault();
          axios.post('/score', null, {params: {score: kills, name}})
            .then(res => updateScores(res.data));
          updateSubmit(false);
        }}>Submit</button>
      </form>
      }
      </div>
    </div>
  )
}

export default Over;