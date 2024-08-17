
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// container
let objects: THREE.Mesh[] = [];

//1
const scene = new THREE.Scene();

//2
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(70);
//3
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//4
let orbitControls = new OrbitControls(camera, renderer.domElement);

//5
const axes = new THREE.AxesHelper(100);
scene.add(axes);

//6
const coneGeometry = new THREE.ConeGeometry(2, 5, 32, 32);
const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 32, 32);
const hedrongeometry = new THREE.DodecahedronGeometry(1, 1);
const circleGeometry = new THREE.CircleGeometry(5, 32);

//7 create objects
for (let i = 0; i < 1000; i++) {
  let material = new THREE.MeshBasicMaterial({ color: 0xffff00 * Math.random() })
  if (i < 200) {
    createMeshFromGeometryAndMat(coneGeometry, material);
  }
  else if (i >= 200 && i < 400) {
    createMeshFromGeometryAndMat(boxGeometry, material);
  }
  else if (i >= 400 && i < 600) {
    createMeshFromGeometryAndMat(capsuleGeometry, material);
  }
  else if (i >= 600 && i < 800) {
    createMeshFromGeometryAndMat(hedrongeometry, material);
  } else {
    createMeshFromGeometryAndMat(circleGeometry, material)
  }
}

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
  scene.rotateX(0.01);
  scene.rotateY(0.01);
  scene.rotateZ(0.01);
  renderer.render(scene, camera)
  for (let i = 0; i < 1000; i++) {
    //   objects[i].rotateX(0.1);
    //   objects[i].rotateY(0.1);
    //   objects[i].rotateZ(0.1);
    objects[i].scale.set(THREE.MathUtils.randFloatSpread(2), THREE.MathUtils.randFloatSpread(2), THREE.MathUtils.randFloatSpread(2))
  }
}

function createMeshFromGeometryAndMat(geometry: THREE.BufferGeometry, material: THREE.MeshBasicMaterial) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.setX(THREE.MathUtils.randFloatSpread(100));
  mesh.position.setY(THREE.MathUtils.randFloatSpread(100));
  mesh.position.setZ(THREE.MathUtils.randFloatSpread(100));
  scene.add(mesh);
  objects.push(mesh);
}

animate()