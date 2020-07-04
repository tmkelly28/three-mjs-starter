(({ THREE, colorPicker, LookupTable3D }) => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  const controls = new THREE.OrbitControls(camera, renderer.domElement)
  // controls.update() must be called after any manual changes to the camera's transform
  camera.position.set(10, 10, 5)
  controls.update()

  const gridHelper = new THREE.GridHelper(10, 10)
  scene.add(gridHelper)

  const createCube = ({ x, y, z }) => {
    const geometry = new THREE.BoxBufferGeometry(1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x333333 })
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.x = x
    mesh.position.y = y
    mesh.position.z = z
    scene.add(mesh)

    return mesh
  }

  const pointerStartingPos = new THREE.Vector3(0.5, 0.5, 0.5)
  const pointer = createCube(pointerStartingPos)
  pointer.material.depthTest = false
  pointer.material.opacity = 0.25
  pointer.material.transparent = true

  const lookupTable = new LookupTable3D()
  window.lookupTable = lookupTable
  let selectedColor = 'blue'
  colorPicker.addClickListener(colorName => {
    selectedColor = colorName
  })
  colorPicker.render()

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )
  }

  const onMouseMove = event => {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(gridHelper)
    if (!intersects.length) return

    const point = intersects[0].point

    const x = Math.round(point.x) - 0.5
    const z = Math.round(point.z) - 0.5

    let y = 0.5
    while (lookupTable.check({ x, y, z })) {
      y += 1
    }
    pointer.position.x = x
    pointer.position.z = z
    pointer.position.y = y
  }

  const onMouseDown = event => {
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(gridHelper)
    if (!intersects.length) return

    const cube = createCube(pointer.position)
    cube.material.color.setColorName(selectedColor)
    lookupTable.add(cube)
    pointer.position.y += 1
  }

  const animate = () => {
    requestAnimationFrame(animate)

    controls.update()

    renderer.render(scene, camera)
  }

  window.addEventListener('resize', onWindowResize, false)
  window.addEventListener('mousemove', onMouseMove, false)
  window.addEventListener('mousedown', onMouseDown, false)

  animate()
})(window)
