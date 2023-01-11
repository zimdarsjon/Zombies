import React from 'react';
const axios = require('axios');

const {useEffect, useState} = React;

const Scores = ({scores}) => {

  return (
     <div className='scores'>
         <h3>High Scores</h3>
         <div className='scoreheader'>
          <span>Name</span>
          <span>Score</span>
         </div>
         {scores.map((score, i) => {
          return (<div className='score' key={i}>
            <span>{score.name}</span>
            <span>{score.score}</span>
            </div>)
         })}
     </div>
  )
}

export default Scores;