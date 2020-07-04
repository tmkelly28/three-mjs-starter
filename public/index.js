(({ THREE, colorPicker }) => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  const controls = new THREE.OrbitControls(camera, renderer.domElement)
  // controls.update() must be called after any manual changes to the camera's transform
  camera.position.set(0, 0, 5)
  controls.update()

  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({color: 0x333333})
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )
  }

  const animate = () => {
    requestAnimationFrame( animate )

    controls.update()

    renderer.render(scene, camera)
  }

  window.addEventListener('resize', onWindowResize, false)

  colorPicker.addClickListener(colorName => {
    cube.material.color.setColorName(colorName)
  })

  colorPicker.render()

  animate()
})(window)
