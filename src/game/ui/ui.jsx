import React from 'react';
import Health from './health.jsx';
import Kills from './kills.jsx';
import Pause from './pause.jsx';
import Start from './start.jsx';

const { useEffect, useState } = React;

const UI = ({hp, kills, paused, game}) => {
  let [play, updatePlay] = useState(false);

  return (
    <div>
      <div>
        <Health hp={hp} />
        <Kills kills={kills} />
      </div>
      <div>
        {paused && <Pause kills={kills} game={game}/>}
      </div>
      <div>
        {!play && <Start game={game} updatePlay={updatePlay}/>}
      </div>
  </div>
  )
}

export default UI;