import { PerspectiveCamera, Vector3} from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.set(75, 20, 0);
  camera.lookAt(new Vector3(0, 0, 0));
  return camera;
}

export { createCamera };