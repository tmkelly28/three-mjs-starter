import THREE from '/three.mjs'

export default class Cube {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  render(scene) {
    const geometry = new THREE.BoxBufferGeometry(1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x333333 })
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.x = this.x
    mesh.position.y = this.y
    mesh.position.z = this.z

    scene.add(mesh)

    return mesh
  }
}
