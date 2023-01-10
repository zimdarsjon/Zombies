import React from 'react';
const axios = require('axios');

const {useEffect, useState} = React;

const Scores = ({scores}) => {

  return (
     <div className='scores'>
         <h3>High Scores</h3>
         {scores.map((score, i) => {
          return (<div className='score' key={i}>
            <span>Name: {score.name}</span>
            <span>Score: {score.score}</span>
            </div>)
         })}
     </div>
  )
}

export default Scores;