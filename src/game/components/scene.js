import { Color, Scene, CubeTextureLoader } from 'three';

function createScene() {
  const scene = new Scene();
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    '/assets/background/FS002_Night_Cubemap_left.png',
    '/assets/background/FS002_Night_Cubemap_right.png',
    '/assets/background/FS002_Night_Cubemap_up.png',
    '/assets/background/FS002_Night_Cubemap_down.png',
    '/assets/background/FS002_Night_Cubemap_front.png',
    '/assets/background/FS002_Night_Cubemap_back.png'
  ]);
  scene.background = texture;
  return scene;
}

export { createScene }