import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { AnimationMixer, Clock, Vector3, Quaternion, Euler, Matrix4, LoopOnce } from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';

class Spawner {
  constructor(scene, loop, animations, models, kill, damagePlayer) {
    this.damagePlayer = damagePlayer;
    this.kill = kill;
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
    if (this.maxSpawnRate > 0.1) {
      this.maxSpawnRate -= 0.05;
    }
  }
  async spawn() {
    this.setNextSpawn();
    let zombie = await createZombie(this.animations, this.models, this.scene, this.kill, this.damagePlayer, this.loop);
    this.loop.updatables.push(zombie);
    this.scene.add(zombie);
  }
  tick() {
    if (this.clock.getElapsedTime() > this.nextSpawnTime) {
      this.spawn();
    }
  }
}

async function createZombie(animations, models, scene, kill, damagePlayer, loop) {
  let zombie, animation, speed
  let size = 0.1;
  let loader = new FBXLoader();
  let randomAnimationInt = Math.floor(Math.random() * 4);
  let randomModelInt = Math.floor(Math.random() * 3);

  // Load Animzation
  if (randomAnimationInt === 0) {
    animation = animations.run;
    speed = 16;
  } else if (randomAnimationInt === 1) {
    animation = animations.walkone;
    speed = 5;
  } else if (randomAnimationInt === 2) {
    animation = animations.walktwo;
    speed = 5;
  } else if (randomAnimationInt === 3) {
    animation = animations.crawl;
    speed = 3;
  }

  // Load Model
  if (randomModelInt === 0) {
    zombie = SkeletonUtils.clone(models.cop)
  } else if (randomModelInt === 1) {
    zombie = SkeletonUtils.clone(models.girl)
    size = 0.07;
  } else if (randomModelInt === 2) {
    zombie = SkeletonUtils.clone(models.soldier)
  }

  // Rendering
  let mixer = new AnimationMixer(zombie);
  let moveAnimation = mixer.clipAction(animation.animations[0]);
  zombie.scale.setScalar(size);
  zombie.children[1].castShadow = true;

  // Set Animations
  let attackAnimation, deathAnimation;
  if (speed === 3) {
    deathAnimation = mixer.clipAction(animations.crawldeath.animations[0]);
    attackAnimation = mixer.clipAction(animations.bite.animations[0]);
  } else {
    attackAnimation = mixer.clipAction(animations.attack.animations[0]);
    deathAnimation = mixer.clipAction(animations.death.animations[0]);
  }
  deathAnimation.repetitions = 0;
  deathAnimation.clampWhenFinished = true;

  // Spawn Radius
  let radius = 600;
  let angle = Math.random() * Math.PI * 2;
  let x = Math.cos(angle) * radius;
  let z = Math.sin(angle) * radius;
  zombie.position.set(x, 0, z);
  zombie.lookAt(0, 0, 0);

  // Stats
  zombie.health = 3;
  zombie.isZombie = true;

  zombie.damage = () => {
    zombie.health -= 1;
    if (zombie.health <= 0) {
      if (!zombie.dead) {
        if (zombie.attacking) {
          attackAnimation.fadeOut(2);
        } else {
          moveAnimation.fadeOut(2);
        }
        deathAnimation.reset();
        deathAnimation.fadeIn(1);
        deathAnimation.play();
        speed = 0;
        kill();
        setTimeout(() => {
          scene.remove(zombie);
        }, 5000)
        setTimeout(() => {
          zombie.lookAt(0, 0, 0);
        }, 1000)
        zombie.dead = true;
      }
    }
  }

  zombie.attack = () => {
    if (!zombie.dead) {
      damagePlayer();
      setTimeout(() => {
        zombie.attack();
      }, 3833)
    }
  }

  zombie.tick = (delta) => {
    if ((radius > 10 && speed > 3) || (radius > 8)) {
      radius = radius - (speed * delta);
      let x = Math.cos(angle) * radius;
      let z = Math.sin(angle) * radius;
      zombie.position.set(x, 0, z);
    } else {
      if (!zombie.attacking) {
        moveAnimation.fadeOut(2);
        attackAnimation.reset();
        attackAnimation.fadeIn(1);
        attackAnimation.play();
        zombie.attacking = true;
        setTimeout(() => {
          zombie.lookAt(0, 0, 0);
        }, 1000)
        setTimeout(() => {
          zombie.attack();
        }, 1200)
      }
    }

    mixer.update(delta);
  };

  zombie.position.x *= -1.0;
  zombie.position.y *= -1.0;
  zombie.applyMatrix4(new Matrix4().makeScale(-1.0, 1.0, 1.0));
  moveAnimation.play();

  // Fix Rotation Glitch
  setTimeout(() => {
    if (zombie.rotation.x > 0) {
      zombie.rotation.x = 0;
      zombie.lookAt(0, 0, 0);
    }
  }, 1000);
  zombie.lookAt(0, 0, 0);

  return zombie;
}

async function createSpawner(scene, loop, kill, damagePlayer) {
  let loader = new FBXLoader();
  let animations = {
    run: await loader.loadAsync('/assets/fbx/run.fbx'),
    walkone: await loader.loadAsync('/assets/fbx/walkone.fbx'),
    walktwo: await loader.loadAsync('/assets/fbx/walktwo.fbx'),
    crawl: await loader.loadAsync('/assets/fbx/crawl.fbx'),
    death: await loader.loadAsync('/assets/fbx/death.fbx'),
    crawldeath: await loader.loadAsync('/assets/fbx/crawldeath.fbx'),
    attack: await loader.loadAsync('/assets/fbx/attack.fbx'),
    bite: await loader.loadAsync('/assets/fbx/bite.fbx'),
  }
  let models = {
    girl: await loader.loadAsync('/assets/fbx/girl.fbx'),
    cop: await loader.loadAsync('/assets/fbx/cop.fbx'),
    soldier: await loader.loadAsync('/assets/fbx/soldier.fbx')
  }
  const spawner = new Spawner(scene, loop, animations, models, kill, damagePlayer);
  return spawner;
}

export { createSpawner }