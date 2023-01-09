import { CircleGeometry, MeshStandardMaterial, Mesh } from 'three';

function createGround() {
  const geometry = new CircleGeometry(1000, 32);
  const material = new MeshStandardMaterial({ color: '#0a240f'});
  const circle = new Mesh(geometry, material);
  circle.rotation.x = - Math.PI / 2;
  circle.receiveShadow = true;
  return circle;
}

export { createGround }