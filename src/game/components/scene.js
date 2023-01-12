import { Color, Scene, CubeTextureLoader, Fog, FogExp2, MeshBasicMaterial } from 'three';

function createScene() {
  const scene = new Scene();
  const loader = new CubeTextureLoader();
  const color = 'darkgrey'
  scene.background = new Color(color);
  let fog = new Fog(color, 3, 800);
  fog.fogType = FogExp2;
  scene.fog = fog;
  return scene;
}

export { createScene }