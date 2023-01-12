import { DirectionalLight, HemisphereLight } from 'three';

function createLights() {

  const moonLight = new DirectionalLight('white', 1);
  moonLight.position.set(0, 100, 100);
  moonLight.castShadow = true;
  moonLight.shadow.camera.near = 0.1;
  moonLight.shadow.camera.near = 50;
  moonLight.shadow.camera.left = -100;
  moonLight.shadow.camera.right = 100;
  moonLight.shadow.camera.top = 100;
  moonLight.shadow.camera.bottom = -100;
  moonLight.shadow.mapSize.width = 2048;
  moonLight.shadow.mapSize.height = 2048;
  moonLight.shadow.bias = 0.001;

  const ambientLight = new HemisphereLight('white', 'darkgrey', 2);

  return { moonLight, ambientLight };
}

export { createLights }