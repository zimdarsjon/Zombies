import React from 'react';
import Health from './health.jsx';
import Kills from './kills.jsx';
import Pause from './pause.jsx';


const { useEffect, useState } = React;

const UI = ({hp, kills, paused, game}) => {

  return (
    <div>
      <div>
        <Health hp={hp} />
        <Kills kills={kills} />
      </div>
      <div>
        {paused && <Pause kills={kills} game={game}/>}
      </div>
  </div>
  )
}

export default UI;