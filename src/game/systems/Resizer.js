const setSize = (container, camera, renderer, controls) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  controls.viewHalfX = container.clientWidth / 2;
  controls.viewHalfY = container.clientHeight / 2;
}

class Resizer {
  constructor(container, camera, renderer, controls) {
    setSize(container, camera, renderer, controls);
    window.addEventListener('resize', () => {
      setSize(container, camera, renderer, controls);
    })
  }
}

export { Resizer }