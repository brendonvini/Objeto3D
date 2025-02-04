import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//cena
const scene = new THREE.Scene();
//camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000);
//renderização
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Adicionando o cubo
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//Posição da camera 
camera.position.z = 5;

//Configurando Luz primaria 
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

//Configuração dos controles orbitais
const controls = new OrbitControls(camera, renderer.domElement);

//Função para chamar a cena 
function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render (scene, camera);
}
//Usado para movimentar a camera usando teclado
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
      case 87: // W
          camera.position.z -= 0.1;
          break;
      case 65: // A
          camera.position.x -= 0.1;
          break;
      case 83: // S
          camera.position.z += 0.1;
          break;
      case 68: // D
          camera.position.x += 0.1;
          break;
  }
});
//Chamando os id do Html
const objectColorInput = document.getElementById('object-color');
const backgroundGrayInput = document.getElementById('background-gray');
const XInput = document.getElementById('x');
const YInput = document.getElementById('y');
const ZInput = document.getElementById('z');

// Atualizar cor do objeto
objectColorInput.addEventListener('input', (e) => {
  material.color.set(e.target.value);
});

// Atualizar cor de fundo
backgroundGrayInput.addEventListener('input', (e) => {
  const grayValue = parseInt(e.target.value);
  scene.background = new THREE.Color(`rgb(${grayValue}, ${grayValue}, ${grayValue})`);
});

// Atualizar posição do objeto
XInput.addEventListener('input', (e) => {
  cube.position.x = parseFloat(e.target.value);
});
YInput.addEventListener('input', (e) => {
  cube.position.y = parseFloat(e.target.value);
});
ZInput.addEventListener('input', (e) => {
  cube.position.z = parseFloat(e.target.value);
});

renderer.setAnimationLoop(animate);