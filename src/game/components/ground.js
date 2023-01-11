import { Mesh, RepeatWrapping, MeshLambertMaterial, PlaneGeometry, TextureLoader } from 'three';

function createGround() {
  let texture = new TextureLoader().load('assets/images/darkgrass.jpeg');
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;

  texture.repeat.set(100, 100);

  let material = new MeshLambertMaterial({ map: texture});
  let plane = new Mesh(new PlaneGeometry(2000, 2000), material);
  plane.rotation.x = - Math.PI / 2;
  return plane;
}

export { createGround }