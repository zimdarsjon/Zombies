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

let health = 10;
let paused = false;
let kills = 0;

let updateKillCount, updateHealthBar, updatePauseState

class Game {
  constructor(container, updateHealth, updateKills, updatePause) {
    updateHealthBar = updateHealth;
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
    spawner = await createSpawner(scene, loop, this.incrementKills);
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
  stop() {
    paused = true;
    loop.stop();
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
}

export { Game };