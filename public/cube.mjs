import THREE from '/three.mjs'
import {scene} from '/init.mjs'

export default ({x, y, z}) => {
  const geometry = new THREE.BoxBufferGeometry(1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x333333 })
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = x
  mesh.position.y = y
  mesh.position.z = z

  scene.add(mesh)

  return mesh
}
