import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

async function createTrees() {
  const loader = new GLTFLoader();
  let tree = await loader.loadAsync('assets/polytree/scene.gltf', function ( gltf ) {
  }, undefined, e => console.log(e));

  let results = [];
  tree = tree.scene;
  tree.position.set(0, 0, -200);
  tree.scale.setScalar(1);
  tree.castShadow = true;

  while (results.length < 40) {
    tree = tree.clone();
    tree.position.set(randomCoord(), -2, randomCoord());
    tree.scale.setScalar(randomScale());
    tree.rotation.y = Math.random() * Math.PI;
    results.push(tree)
  }

  return results;
}

function randomCoord () {
  let number = Math.random() * 800 + 150;
  let sign = 1;
  if (Math.random() > 0.5) {
    sign = -1;
  }
  number *= sign;
  return number;
}

function randomScale () {
  let number = Math.random() * 1 + 1;
  return number;
}

export { createTrees }