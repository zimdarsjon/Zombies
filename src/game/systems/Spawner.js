import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { AnimationMixer, Clock, Vector3, Quaternion, Euler, Matrix4 } from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';

class Spawner {
  constructor(scene, loop, animations, models) {
    this.scene = scene;
    this.loop = loop;
    this.maxSpawnRate = 10;
    this.nextSpawnTime = 0;
    this.clock = new Clock();
    this.clock.start();
    this.loader = new FBXLoader();
    this.animations = animations;
    this.models = models;
  }
  setNextSpawn() {
    let timeout = Math.random() * this.maxSpawnRate;
    this.nextSpawnTime = this.clock.getElapsedTime() + timeout;
    if (this.maxSpawnRate > 1) {
      this.maxSpawnRate -= 0.05;
    }
  }
  async spawn() {
    this.setNextSpawn();
    let zombie = await createZombie(this.animations, this.models, this.scene);
    this.loop.updatables.push(zombie);
    this.scene.add(zombie);
  }
  tick() {
    if (this.clock.getElapsedTime() > this.nextSpawnTime) {
      this.spawn();
    }
  }
}

async function createZombie(animations, models, scene) {
  let zombie, animation, speed
  let size = 0.1;

  let loader = new FBXLoader();

  let randomAnimationInt = Math.floor(Math.random() * 4);
  let randomModelInt = Math.floor(Math.random() * 4);

  // Load Animzation
  if (randomAnimationInt === 0) {
    animation = animations.run;
    speed = 5;
  } else if (randomAnimationInt === 1) {
    animation = animations.walkone;
    speed = 3;
  } else if (randomAnimationInt === 2) {
    animation = animations.walktwo;
    speed = 3;
  } else if (randomAnimationInt === 3) {
    animation = animations.crawl;
    speed = 1;
  }

  // Load Model
  if (randomModelInt === 0) {
    zombie = SkeletonUtils.clone(models.woman);
    zombie.rotation.set(null);
  } else if (randomModelInt === 1) {
    zombie = SkeletonUtils.clone(models.cop)
  } else if (randomModelInt === 2) {
    zombie = SkeletonUtils.clone(models.girl)
    size = 0.07;
  } else if (randomModelInt === 3) {
    zombie = SkeletonUtils.clone(models.soldier)
  }
  let mixer = new AnimationMixer(zombie);
  let moveAnimation = mixer.clipAction(animation.animations[0]);
  zombie.scale.setScalar(size);
  zombie.children[1].castShadow = true;


  let radius = 100;
  let angle = Math.random() * Math.PI * 2;
  let x = Math.cos(angle) * radius;
  let z = Math.sin(angle) * radius;
  zombie.position.set(x, 0, z);
  zombie.lookAt(0, 0, 0);

  zombie.health = 3;
  zombie.isZombie = true;
  zombie.damage = () => {
    zombie.health -=1;
    if (zombie.health <= 0) {
      console.log('Die')
      scene.remove(zombie);
    }
  }

  zombie.tick = (delta) => {
    if (radius > 3) {
      radius = radius - (speed * delta);
      let x = Math.cos(angle) * radius;
      let z = Math.sin(angle) * radius;
      zombie.position.set(x, 0, z);
    }
    mixer.update(delta);
  };



  // if (zombie.rotation.x > 0) {
  //   zombie.rotation.x = 0;
  //   zombie.lookAt(0, 0, 0);
  // }
  // window.addEventListener('click', () => {
  //   if (zombie.rotation.x > 0) {
  //     zombie.rotation.x = 0;
  //     zombie.lookAt(0, 0, 0);
  //   }
  //   zombie.lookAt(0, 0, 0);
  // })
  zombie.position.x *= -1.0;
  zombie.position.y *= -1.0;
  zombie.applyMatrix4(new Matrix4().makeScale(-1.0, 1.0, 1.0));


  moveAnimation.play();
  setTimeout(() => {
    if (zombie.rotation.x > 0) {
      zombie.rotation.x = 0;
      zombie.lookAt(0, 0, 0);
    }
  }, 1000);
  zombie.lookAt(0, 0, 0);
  return zombie;
}

async function createSpawner (scene, loop) {
  let loader = new FBXLoader();
  let animations = {
    run: await loader.loadAsync('/assets/fbx/run.fbx'),
    walkone: await loader.loadAsync('/assets/fbx/walkone.fbx'),
    walktwo: await loader.loadAsync('/assets/fbx/walktwo.fbx'),
    crawl: await loader.loadAsync('/assets/fbx/crawl.fbx')
  }
  let models = {
    woman: await loader.loadAsync('/assets/fbx/woman.fbx'),
    girl: await loader.loadAsync('/assets/fbx/girl.fbx'),
    cop: await loader.loadAsync('/assets/fbx/cop.fbx'),
    soldier: await loader.loadAsync('/assets/fbx/soldier.fbx')
  }
  const spawner = new Spawner(scene, loop, animations, models);
  return spawner;
}

export { createSpawner }