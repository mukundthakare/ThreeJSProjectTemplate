
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

//5
// green
const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({ color: "green" });
const greenCubeMesh = new THREE.Mesh(cubeGeometry, material);
greenCubeMesh.position.setY(10);

// red
const redCubeGeom = new THREE.BoxGeometry(15, 15, 15);
const redCubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const redCubeMesh = new THREE.Mesh(redCubeGeom, redCubeMaterial);
scene.add(redCubeMesh);
redCubeMesh.position.setX(15);

// blue
const blueCubeGeom = new THREE.BoxGeometry(20, 20, 20);
const blueCubeMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
const blueCubeMesh = new THREE.Mesh(blueCubeGeom, blueCubeMaterial);
scene.add(blueCubeMesh);
blueCubeMesh.position.setZ(20);
scene.add(greenCubeMesh);

//axes helper
const axisControl = new THREE.AxesHelper(100);
scene.add(axisControl);

//grid helper
const size = 100;
const divisions = 100;
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

//box helper
const sphere = new THREE.SphereGeometry(10);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: "yellow" });
const sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
sphereMesh.position.setX(70);
scene.add(sphereMesh);
const box = new THREE.BoxHelper(sphereMesh, 0xffffff);
scene.add(box);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

function animate() {
  requestAnimationFrame(animate);
  blueCubeMesh.rotateZ(0.2);
  redCubeMesh.rotateX(0.2);
  greenCubeMesh.rotateY(0.2);
  render();
}

function render() {
  renderer.render(scene, camera)
}

animate()