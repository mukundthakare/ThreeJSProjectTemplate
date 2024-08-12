
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//1
const scene = new THREE.Scene();

//2
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 70;
camera.position.x = 70;
camera.position.y = 70;

//3
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//4
new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BufferGeometry();

// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array([
  -1.0, -1.0, 1.0, // v0
  1.0, -1.0, 1.0, // v1
  1.0, 1.0, 1.0, // v2

  1.0, 1.0, 1.0, // v3
  -1.0, 1.0, 1.0, // v4
  -1.0, -1.0, 1.0  // v5
]);

geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//axes helper
const axisControl = new THREE.AxesHelper(100);
scene.add(axisControl);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera)
}

animate()