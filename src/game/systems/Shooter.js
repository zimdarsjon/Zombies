import { SphereGeometry, Mesh, MeshBasicMaterial, Vector3, Object3D, Raycaster, Vector2, Quaternion } from 'three';

class Shooter {
  constructor(scene, camera, gun) {
    this.raycaster = new Raycaster();
    this.pointer = new Vector2();
    this.scene = scene;
    this.gun = gun;
    this.camera = camera;
    this.bullets = [];
    this.emitter = new Object3D();
    this.emitter.position.set(3.5, -1.4, -5);
    camera.add(this.emitter);
    window.addEventListener('click', (e) => {this.shoot(e)});
  }
  shoot(event) {
    // Check if paused
    this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	  this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    this.raycaster.setFromCamera( this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects( this.scene.children );

    let bullet = new Mesh(
      new SphereGeometry(0.5, 8, 8),
      new MeshBasicMaterial({color: 'red'})
    )
    let bulletPosition = new Vector3();
    this.emitter.getWorldPosition(bulletPosition);
    bullet.position.copy(bulletPosition);
    bullet.lookAt(this.raycaster.ray.direction.multiplyScalar(1000))
    if (intersects.length > 0) {
      let intersect = intersects[0];
      if (intersect.object.parent.isZombie) {
        bullet.lookAt(intersect.point);
        intersect.object.parent.damage();
      }
    }

    setTimeout(() => {
      this.scene.remove(bullet);
    }, 5000);
    this.bullets.push(bullet);
    this.scene.add(bullet);
  }
  tick(delta) {
    this.bullets.forEach(bullet => {
      bullet.translateZ(500 * delta);
    })
  }
}

export { Shooter }