import { PerspectiveCamera, Vector3} from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(60, 1, 0.01, 1000);
  camera.position.set(0, 16, 0);
  return camera;
}

export { createCamera };