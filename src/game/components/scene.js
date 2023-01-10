import { Color, Scene, CubeTextureLoader, Fog, FogExp2, MeshBasicMaterial } from 'three';

function createScene() {
  const scene = new Scene();
  const loader = new CubeTextureLoader();
  const color = 'lightgrey'
  scene.background = new Color(color);
  let fog = new Fog(color, 20, 200);
  fog.fogType = FogExp2;
  scene.fog = fog;
  return scene;
}

export { createScene }