import React from 'react';

const Start = ({game, updatePlay, active}) => {


  return (
  <div className='playScreen'>
    <div className='container'>
    <h1>Fog of the Dead</h1>
    <button onClick={e => {
      e.preventDefault();
      game.start();
      updatePlay(true);
    }} disabled={!active}>Play</button>
    </div>
  </div>
  )
}

export default Start;