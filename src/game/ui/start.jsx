import React from 'react';

const Start = ({game, updatePlay}) => {

  return (
  <div className='playScreen'>
    <h3>Fog of the Dead</h3>
    <button onClick={e => {
      e.preventDefault();
      game.start();
      updatePlay(true);
    }}>Play</button>
  </div>
  )
}

export default Start;