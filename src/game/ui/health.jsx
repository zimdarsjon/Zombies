import React from 'react';
import { AiFillHeart } from 'react-icons/Ai';

const { useEffect, useState } = React;

const Health = ({hp}) => {
  let [format, updateFormat] = useState({
    width: '100%'
  })

  useEffect(() => {
    updateFormat({
      width: hp * 10 + '%'
    })
  }, [hp])

  return (
    <>
      <div className='healthbar'>
        <div className='health' style={format}>

        </div>
      </div>
      <div className='heart'>
        <AiFillHeart />
      </div>
    </>
  )
}

export default Health;