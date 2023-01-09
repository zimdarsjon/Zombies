import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { createGround } from './components/ground.js';
import { createLights } from './components/lights.js';
import { createSpawner } from './systems/spawner.js';


// Remove
import { createCube } from './components/cube.js';

let camera, controls, renderer, scene, loop, spawner

class Game {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    controls = createControls(camera, renderer);

    container.append(renderer.domElement);

    const ground = createGround();
    const { moonLight, ambientLight} = createLights();
    scene.add(ground, moonLight, ambientLight, createCube());

    const resizer = new Resizer(container, camera, renderer);

    loop = new Loop(camera, scene, renderer);
    loop.updatables.push(controls);

    renderer.render(scene, camera);
  }
  async init() {
    // Let spawner
    spawner = await createSpawner(scene, loop);
    loop.updatables.push(spawner);
  }
  start() {
    loop.start();
  }
}

export { Game };