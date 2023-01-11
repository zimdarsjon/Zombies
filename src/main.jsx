import { Game } from './game/Game.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import UI from './game/ui/ui.jsx';

async function main(updateHealth, updateKills, updatePause, updateOver) {
  const container = document.querySelector('#root');
  const game = new Game(container, updateHealth, updateKills, updatePause, updateOver);
  await game.init();
  return game;
}


const { useState, useEffect } = React;

const App = () => {
  let [health, updateHealth] = useState(10);
  let [kills, updateKills] = useState(0);
  let [active, updateActive] = useState(false);
  let [paused, updatePause] = useState(false);
  let [game, updateGame] = useState({});
  let [over, updateOver] = useState(false);

  async function load() {
    if (!active) {
      let newGame = await main(updateHealth, updateKills, updatePause, updateOver).catch(err => console.log(err));
      updateActive(true);
      updateGame(newGame);
    }
  }
  load();

  return (
    <UI hp={health} kills={kills} paused={paused} game={game} over={over} active={active}/>
  )
}

const container = document.getElementById('ui');
const root = createRoot(container);
root.render(<App />);