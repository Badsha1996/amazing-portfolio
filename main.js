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
let targetScale = window.innerWidth < 768 ? 0.95 : 1.5;
let currentScale = window.innerWidth < 768 ? 0.95 : 1.5;

initiate_model();
animate();

window.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = (e.clientY / window.innerHeight) * 2 + 1;

  const distanceFromCenter = Math.sqrt(mouseX * mouseY + mouseY * mouseY);
  const baseScale = window.innerWidth < 768 ? 0.95 : 1.5;
  targetScale = baseScale + distanceFromCenter * 0.05;
});

window.addEventListener("scroll", () => {
  const scrollPercent =
    window.scrollY / (document.body.scrollHeight - window.innerHeight);
  targetRotationY += scrollPercent * 0.001;
  const baseScrollModifier = window.innerWidth < 768 ? 0.002 : 0.003;
  targetScale += scrollPercent * baseScrollModifier;
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  adjustModelResponsiveness();
});

function adjustModelResponsiveness() {
  if (!model) return;
  const width = window.innerWidth;
  if (width < 768) {
    targetScale = 0.95;
    camera.position.set(0, 8, 125);
  } else {
    targetScale = 1.5;
    camera.position.set(1, 15, 115);
  }
}

function initiate_model() {
  // Creating an object that will render my model
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // Initial position based on screen width
  const width = window.innerWidth;
  if (width < 768) {
    camera.position.set(0, 8, 125);
  } else {
    camera.position.set(1, 15, 115);
  }

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
    adjustModelResponsiveness();
    currentScale = targetScale;
    model.scale.set(currentScale, currentScale, currentScale);
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

// ========================== ANIMATION LOAD FOR HERO SECTION ===========================
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

// ========================== RESUME MODAL VIEWER INTERACTIONS ===========================
document.addEventListener("DOMContentLoaded", () => {
  const resumeModal = document.getElementById("resumeModal");
  const viewResumeBtn = document.getElementById("viewResumeBtn");
  const closeResumeBtn = document.getElementById("closeResumeBtn");
  const tabBtns = document.querySelectorAll(".tab_btn");
  const tabContents = document.querySelectorAll(".tab_content");

  if (viewResumeBtn && resumeModal) {
    viewResumeBtn.addEventListener("click", () => {
      resumeModal.showModal();
    });
  }

  if (closeResumeBtn && resumeModal) {
    closeResumeBtn.addEventListener("click", () => {
      resumeModal.close();
    });
  }

  // Tabs logic
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");

      // Active button toggle
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Active tab content panel toggle
      tabContents.forEach(content => {
        content.classList.remove("active");
        if (content.id === `tab-${targetTab}`) {
          content.classList.add("active");
        }
      });
    });
  });

  // Fallback for browsers that do not support native closedby="any" (like Safari)
  if (resumeModal && !('closedBy' in HTMLDialogElement.prototype)) {
    resumeModal.addEventListener("click", (event) => {
      // If the clicked target is the dialog overlay element itself
      if (event.target === resumeModal) {
        const rect = resumeModal.getBoundingClientRect();
        const isClickedInside = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );

        if (!isClickedInside) {
          resumeModal.close();
        }
      }
    });
  }
});


