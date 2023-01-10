// Systems
import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { createSpawner } from './systems/spawner.js';
import { createFirstPersonControls } from './systems/firstPersonControls.js';
import { Shooter } from './systems/Shooter.js';

// Components
import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createGround } from './components/ground.js';
import { createLights } from './components/lights.js';
import { createGun } from './components/gun.js';

// Remove
import { createCube } from './components/cube.js';

let camera, controls, renderer, scene, loop, spawner, gun, cube, shooter, ui

let health = 1;
let paused = false;
let kills = 0;

let updateKillCount, updateHealthBar, updatePauseState, gameOver

class Game {
  constructor(container, updateHealth, updateKills, updatePause, updateOver) {
    updateHealthBar = updateHealth;
    gameOver = updateOver;
    updateKillCount = updateKills;
    updatePauseState = updatePause;
    this.updatePauseState = updatePauseState;
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    controls = createFirstPersonControls(camera, renderer);
    container.append(renderer.domElement);

    const ground = createGround();
    const { moonLight, ambientLight} = createLights();
    scene.add(ground, moonLight, ambientLight);

    const resizer = new Resizer(container, camera, renderer, controls);

    loop = new Loop(camera, scene, renderer);
    loop.updatables.push(controls);

    renderer.render(scene, camera);

    // Pause Game
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.togglePause();
      }
    })
  }
  async init() {
    // Let spawner
    spawner = await createSpawner(scene, loop, this.incrementKills, this.damagePlayer.bind(this));
    gun = await createGun(camera);
    camera.add(gun);
    scene.add(camera);
    shooter = new Shooter(scene, camera, gun, this);
    loop.updatables.push(spawner, shooter);
  }
  start() {
    loop.start();
    setTimeout(() => {
      this.active = true;
    }, 100)
  }
  restart() {
    health = 10;
    updateHealthBar(health);
    kills = 0;
    updateKillCount(kills);
    gameOver(false);
    this.start();
  }
  togglePause() {
    if (loop.active) {
      updatePauseState(true);
      loop.stop();
      this.active = false;
    } else {
      loop.start();
      updatePauseState(false);
      this.active = true;
    }
  }
  incrementKills() {
    kills++;
    updateKillCount(kills);
  }
  damagePlayer() {
    health--;
    updateHealthBar(health);
    if (health <= 0) {
      gameOver(true);
      loop.stop();
      let newUpdatables = [];
      loop.updatables.forEach(object => {
        if (object.isZombie) {
          object.dead = true;
          scene.remove(object);
        } else {
          newUpdatables.push(object);
        }
      })
      loop.updatables = newUpdatables;
      this.active = false;
    }
  }
}

export { Game };