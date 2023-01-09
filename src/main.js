import { Game } from './game/Game.js';

async function main() {
  const container = document.querySelector('#root');
  const game = new Game(container);
  await game.init();
  game.start();
}

main().catch(err => console.log(err));