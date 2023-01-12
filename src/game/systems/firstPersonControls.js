import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import THREE from 'three';

const createFirstPersonControls = (camera, renderer, container) => {
  const controls = new FirstPersonControls(camera, renderer.domElement);
  controls.tick = (delta) => {
    controls.update(delta);
  }
  controls.lookSpeed = 0.5;
  controls.movementSpeed = 0;
  return controls;
}

export { createFirstPersonControls }