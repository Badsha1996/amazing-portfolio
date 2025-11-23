import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let scene;
let camera;
let renderer;
let model;

let mouseX = 0;
let mouseY = 0;
let targetRotationX = 0;
let targetRotationY = 0;
let currentRotationX = 0;
let currentRotationY = 0;
let targetScale = 1.5;
let currentScale = 1.5;

initiate_model();
animate();

window.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = (e.clientY / window.innerHeight) * 2 + 1;

  const distanceFromCenter = Math.sqrt(mouseX * mouseY + mouseY * mouseY);
  targetScale = 1.5 + distanceFromCenter * 0.05;
});

window.addEventListener("scroll", () => {
  const scrollPercent =
    window.scrollY / (document.body.scrollHeight - window.innerHeight);
  targetRotationY += scrollPercent * 0.001;
  targetScale += scrollPercent * 0.003;
});

function initiate_model() {
  // Creating an object that will render my model
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // x , y and z of a vector
  camera.position.set(1, 15, 115);

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("bg"),
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // LIGHT
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(2, 5, 5);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  const loader = new GLTFLoader();
  loader.load("./assets/model/computer_and_laptop.glb", (gltf) => {
    model = gltf.scene;
    model.scale.set(1.5, 1.5, 1.5);
    scene.add(model);
  });
}

function animate() {
  requestAnimationFrame(animate);

  if (model) {
    targetRotationX = mouseY * 0.1;
    targetRotationY = mouseX * 0.15;

    currentRotationX += (targetRotationX - currentRotationX) * 0.05;
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;

    currentScale += (targetScale - currentScale) * 0.05;

    model.rotation.y = currentRotationY;
    model.rotation.x = currentRotationX;
    model.scale.set(currentScale, currentScale, currentScale);
  }

  renderer.render(scene, camera);
}

// ========================== TYPING ANIMATION =========================

document.addEventListener("DOMContentLoaded", () => {
  const typingText = document.getElementById("typing-text");

  const roles = [
    { text: "ML Engineer", color: "rgb(173, 255, 47)" },
    { text: "Software Developer", color: "#ff6b6b" },
    { text: "Mobile Developer", color: "#4ecdc4" },
    { text: "Problem Solver", color: "#ffd93d" },
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 120;

  function type() {
    const currentRole = roles[roleIndex];
    typingText.style.color = currentRole.color;

    const displayedText = isDeleting
      ? currentRole.text.substring(0, charIndex--)
      : currentRole.text.substring(0, charIndex++);

    typingText.textContent = displayedText;

    if (!isDeleting && charIndex === currentRole.text.length) {
      setTimeout(() => (isDeleting = true), 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    const delay = isDeleting ? typingSpeed / 2 : typingSpeed;
    setTimeout(type, delay);
  }

  type();
});

// ========================== ANIMTION LOAD FOR HERO SECTION ===========================
window.addEventListener("load", () => {
  const topDesign = document.querySelector(".hero_sec_design_top");
  const bottomDesign = document.querySelector(".hero_sec_design_bottom");

  // Add the animation classes with small delays
  setTimeout(() => {
    topDesign.classList.add("animate-in");
  }, 300); // after 0.3s

  setTimeout(() => {
    bottomDesign.classList.add("animate-in");
  }, 600); // after 0.6s
});


