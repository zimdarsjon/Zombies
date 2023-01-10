import { Clock } from 'three';

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.updatables = [];
    this.camera = camera;
    this.renderer = renderer;
    this.scene = scene;
    this.paused = false;
  }
  start() {
    clock.start();
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    })
    this.active = true;
  }
  stop() {
    clock.stop();
    this.renderer.setAnimationLoop(null);
    this.active = false;
  }
  tick() {
    const delta = clock.getDelta();
    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export { Loop }