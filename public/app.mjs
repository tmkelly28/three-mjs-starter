import {camera, renderer, mouse, controls, scene} from '/init.mjs'
import cube from '/cube.mjs'

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
}

const animate = () => {
  requestAnimationFrame(animate)

  controls.update()

  renderer.render(scene, camera)
}

window.addEventListener('resize', onWindowResize, false)
window.addEventListener('mousemove', onMouseMove, false)

cube({ x: 1, y: 1, z: 1 })

animate()
