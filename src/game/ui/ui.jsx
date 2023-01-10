import React from 'react';
import Health from './health.jsx';
import Kills from './kills.jsx';
import Pause from './pause.jsx';
import Start from './start.jsx';
import Over from './over.jsx';
const axios = require('axios');

const { useEffect, useState } = React;

const UI = ({hp, kills, paused, game, over}) => {
  let [play, updatePlay] = useState(false);
  let [scores, updateScores] = useState([]);

  useEffect(() => {
    axios.get('/score')
      .then(res => updateScores(res.data))
      .catch(x => console.log('FAIL'))
  }, [])

  return (
    <div>
      <div>
        <Health hp={hp} />
        <Kills kills={kills} />
        <div className='crosshair'>+</div>
      </div>
      <div>
        {paused && <Pause kills={kills} game={game}/>}
        {!play && <Start game={game} updatePlay={updatePlay}/>}
        {over && <Over kills={kills} game={game} scores={scores} updateScores={updateScores}/>}
      </div>
  </div>
  )
}

export default UI;