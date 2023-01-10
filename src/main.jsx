import { Game } from './game/Game.js';
import React from 'react';
import reactDOM from 'react-dom';
import { render } from 'react-dom';
import UI from './game/ui/ui.jsx';

async function main(updateHealth, updateKills, updatePause) {
  const container = document.querySelector('#root');
  const game = new Game(container, updateHealth, updateKills, updatePause);
  await game.init();
  game.start();
  return game;
}


const { useState, useEffect } = React;

const App = () => {
  let [health, updateHealth] = useState(10);
  let [kills, updateKills] = useState(0);
  let [active, updateActive] = useState(false);
  let [paused, updatePause] = useState(false);
  let [game, updateGame] = useState({});

  async function load() {
    if (!active) {
      let newGame = await main(updateHealth, updateKills, updatePause).catch(err => console.log(err));
      updateActive(true);
      updateGame(newGame);
    }
  }
  load();

  return (
    <UI hp={health} kills={kills} paused={paused} game={game}/>
  )
}

const container = document.getElementById('ui');
render(<App />, container);