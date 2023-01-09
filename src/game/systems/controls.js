import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const createControls = (camera, renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.tick = () => controls.update();
  controls.enableDamping = true; // Compare with FPS
  return controls;
}

export { createControls }