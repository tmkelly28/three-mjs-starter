import THREE, {OrbitControls} from '/three.mjs'

export const scene = new THREE.Scene()
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
export const renderer = new THREE.WebGLRenderer()
export const raycaster = new THREE.Raycaster()
export const mouse = new THREE.Vector2()
export const controls = new OrbitControls(camera, renderer.domElement)
export const gridHelper = new THREE.GridHelper(10, 10)

scene.background = new THREE.Color(0xeeeeee)

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

camera.position.set(10, 10, 5)
// controls.update() must be called after any manual changes to the camera's transform
controls.update()

scene.add(gridHelper)
