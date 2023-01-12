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
      {submit &&
      <form>
        <h1>New High Score!</h1>
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
      <h1>Game Over</h1>
      <h3>Score: {kills}</h3>
      <Scores scores={scores}/>
      <button className='restart' onClick={e => {
        e.preventDefault();
        game.restart();
      }}>Restart</button>
      </div>
    </div>
  )
}

export default Over;