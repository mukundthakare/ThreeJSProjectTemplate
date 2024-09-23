
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

const vecAB = new THREE.Vector2(1, 1);
const matRotationUsingTheta = new THREE.Matrix3().makeRotation(Math.PI / 2);
const matScalingUsingFun = new THREE.Matrix3().makeScale(5, 6);
const matTranslationYUsingFun = new THREE.Matrix3().makeTranslation(new THREE.Vector2(5, 6));

matScalingUsingFun.multiply(matTranslationYUsingFun);

vecAB.applyMatrix3(matTranslationYUsingFun);
vecAB.applyMatrix3(matScalingUsingFun);
vecAB.applyMatrix3(matRotationUsingTheta);

// create a 2*2 rotation matrix
const matRotation = new THREE.Matrix3();
matRotation.set(
  0, -1, 0,
  1, 0, 0,
  0, 0, 1
)

const matTranslation = new THREE.Matrix3();
matTranslation.set(
  1, 0, 5,
  0, 1, 6,
  0, 0, 1
)
vecAB.applyMatrix3(matTranslation);

const matScaling = new THREE.Matrix3();
matScaling.set(
  5, 0, 0,
  0, 6, 0,
  0, 0, 1
);

vecAB.applyMatrix3(matScaling);

const matIdentity = new THREE.Matrix3();
matIdentity.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
matIdentity.translate(5, 6);

matIdentity.transpose();


const mat4 = new THREE.Matrix4();
mat4.set(1, 0, 0, 5, 0, 1, 0, 6, 0, 0, 1, 7, 0, 0, 0, 1);
mat4.makeTranslation(5, 6, 7);
const vecBD = new THREE.Vector3(5, 6, 7)
vecBD.applyMatrix4(mat4);

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