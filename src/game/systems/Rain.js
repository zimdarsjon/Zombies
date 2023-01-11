import { BufferGeometry, Vector3, PointsMaterial, Points } from 'three';

class Rain {
  constructor (scene) {
    this.totalDrops = 10000;
    this.geometry = new BufferGeometry;
    this.geometry.vertices = [];
    for (let i = 0; i < this.totalDrops; i++) {
      let drop = new Vector3 (
        Math.random() * 400 - 200,
        Math.random() * 500 - 250,
        Math.random() * 400 - 200
      );
      drop.velocity = 0;
      this.geometry.vertices.push(drop);
    }
    this.material = new PointsMaterial({
      color: 'white',
      size: 0.1,
      transparent: true
    })
    this.rain = new Points(this.geometry, this.material);
    scene.add(this.rain);
  }
  tick() {
    this.geometry.vertices.forEach(drop => {
      drop.velocity -= 0.1 + Math.random() * 0.1;
      drop.y += drop.velocity;
      if (drop.y < 0) {
        drop.y = 200;
        drop.velocity = 0;
      }
    })
    this.geometry.verticesNeedUpdate = true;
    this.rain.rotation.y += 0.002;
  }
}

export { Rain }