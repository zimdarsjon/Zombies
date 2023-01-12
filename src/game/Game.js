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
import { createTrees } from './components/trees.js';
import { createGrass } from './components/grass.js';

// Remove
import { createCube } from './components/cube.js';

let camera, controls, renderer, scene, loop, spawner, gun, cube, shooter, ui

let health = 10;
let paused = false;
let kills = 0;

let updateKillCount, updateHealthBar, updatePauseState, gameOver

let audio = new Audio('assets/audio/music.mp3');
audio.volume = 0.1;
audio.loop = true;

class Game {
  constructor(container, updateHealth, updateKills, updatePause, updateOver) {
    updateHealthBar = updateHealth;
    gameOver = updateOver;
    updateKillCount = updateKills;
    updatePauseState = updatePause;
    this.updatePauseState = updatePauseState;
    this.playing = false;
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
      console.log(event.key)
      if (event.key === 'Escape') {
        this.togglePause();
      }
      if (event.key === ' ') {
        this.damagePlayer();
        updateKillCount(5);
      }
    })
  }
  async init() {
    // Let spawner
    spawner = await createSpawner(scene, loop, this.incrementKills, this.damagePlayer.bind(this));

    let trees = await createTrees();
    trees.forEach(tree => {
      scene.add(tree);
    });

    let grass = await createGrass();
    grass.forEach(blade => {
      scene.add(blade);
    });

    gun = await createGun(camera);
    camera.add(gun);
    scene.add(camera);
    shooter = new Shooter(scene, camera, gun, this);
    loop.updatables.push(spawner, shooter);
  }
  start() {
    this.playing = true;
    loop.start();
    setTimeout(() => {
      this.active = true;
    }, 100)
    audio.play();
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
    if (!this.playing) {
      return;
    }
    if (loop.active) {
      updatePauseState(true);
      loop.stop();
      this.active = false;
      audio.pause();
      loop.updatables.forEach(object => {
        if (object.isZombie) {
          object.audio.pause();
        }
      })
    } else {
      loop.start();
      updatePauseState(false);
      this.active = true;
      loop.updatables.forEach(object => {
        if (object.isZombie) {
          object.audio.play();
        }
      })
      audio.play();
    }
  }
  incrementKills() {
    kills++;
    updateKillCount(kills);
  }
  damagePlayer() {
    if (!this.active) {
      return
    }
    let grunt = new Audio('assets/audio/grunt.mp3');
    grunt.volume = 0.3;
    grunt.play();
    health--;
    updateHealthBar(health);
    if (health <= 0) {
      this.playing = false;
      audio.pause();
      gameOver(true);
      loop.stop();
      let newUpdatables = [];
      loop.updatables.forEach(object => {
        if (object.isZombie) {
          object.dead = true;
          object.audio.pause();
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