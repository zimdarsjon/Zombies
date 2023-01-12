import React from 'react';
import { GiDeathSkull } from 'react-icons/Gi';
const Kills = ({kills}) => {
  return (
    <div className='kills'>
      <h3 id='kills'>{kills}</h3>
      <GiDeathSkull />
    </div>
  )
}

export default Kills;