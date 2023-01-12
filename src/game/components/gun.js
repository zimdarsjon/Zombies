import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

async function createGun(camera) {
  const loader = new GLTFLoader();
  let gun = await loader.loadAsync('assets/gun/scene.gltf', function ( gltf ) {
  }, undefined, function ( error ) {
    console.error( error );
  } );

  gun = gun.scene;
  gun.position.set(1.1, -1.2, -2);
  gun.rotation.set(0, - Math.PI, 0)
  gun.scale.setScalar(0.0015);
  gun.castShadow = true;
  return gun;
}

export { createGun }