import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { createGround } from './components/ground.js';
import { createLights } from './components/lights.js';
import { createSpawner } from './systems/spawner.js';
import { createGun } from './components/gun.js';
import { createFirstPersonControls } from './systems/firstPersonControls.js';
import { Shooter } from './systems/Shooter.js';


// Remove
import { createCube } from './components/cube.js';

let camera, controls, renderer, scene, loop, spawner, gun, cube, shooter

class Game {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    //controls = createControls(camera, renderer);
    controls = createFirstPersonControls(camera, renderer);
    container.append(renderer.domElement);

    const ground = createGround();
    const { moonLight, ambientLight} = createLights();
    cube = createCube();
    scene.add(ground, moonLight, ambientLight, cube);

    const resizer = new Resizer(container, camera, renderer, controls);

    loop = new Loop(camera, scene, renderer);
    loop.updatables.push(controls);

    renderer.render(scene, camera);
  }
  async init() {
    // Let spawner
    spawner = await createSpawner(scene, loop);
    gun = await createGun(camera);
    camera.add(gun);
    scene.add(camera);
    shooter = new Shooter(scene, camera, gun);
    loop.updatables.push(spawner, shooter);
  }
  start() {
    loop.start();
  }
}

export { Game };