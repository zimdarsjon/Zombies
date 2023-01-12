import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

async function createGrass() {
  const loader = new GLTFLoader();
  let grass = await loader.loadAsync('assets/grass/scene.gltf', function ( gltf ) {
  }, undefined, e => console.log(e));

  let results = [];
  grass = grass.scene;
  grass.position.set(0, 0, -10);
  grass.scale.setScalar(0.05);
  results.push(grass);

  while (results.length < 250) {
    grass = grass.clone();
    grass.position.set(randomCoord(), 0, randomCoord());
    grass.scale.setScalar(randomScale());
    grass.rotation.y = Math.random() * Math.PI;
    results.push(grass)
  }

  return results;
}

function randomCoord () {
  let number = Math.random() * 200;
  let sign = 1;
  if (Math.random() > 0.5) {
    sign = -1;
  }
  number *= sign;
  return number;
}

function randomScale () {
  let number = Math.random() * 0.05 + 0.025;
  return number;
}

export { createGrass }