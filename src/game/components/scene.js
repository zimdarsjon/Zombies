import { Color, Scene, CubeTextureLoader, Fog, FogExp2, MeshBasicMaterial } from 'three';

function createScene() {
  const scene = new Scene();
  const loader = new CubeTextureLoader();
  // const texture = loader.load([
  //   '/assets/background/FS002_Night_Cubemap_left.png',
  //   '/assets/background/FS002_Night_Cubemap_right.png',
  //   '/assets/background/FS002_Night_Cubemap_up.png',
  //   '/assets/background/FS002_Night_Cubemap_down.png',
  //   '/assets/background/FS002_Night_Cubemap_front.png',
  //   '/assets/background/FS002_Night_Cubemap_back.png'
  // ]);
  const color = 'lightgrey'
  scene.background = new Color(color);
  let fog = new Fog(color, 20, 200);
  fog.fogType = FogExp2;
  scene.fog = fog;
  return scene;
}

export { createScene }