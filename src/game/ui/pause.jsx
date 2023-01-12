import React from 'react';

const Pause = ({kills, game}) => {

  return (
    <div className='pauseScreen'>
      <div className='container'>
      <h2>Game Paused</h2>
      <h3>Score: {kills}</h3>
      <button onClick={e => {
        e.preventDefault();
        game.togglePause();
      }}>Resume</button>
      </div>
    </div>
  )
}

export default Pause;