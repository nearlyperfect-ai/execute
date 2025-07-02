let scene, camera, renderer, skeletonModel;

init3DViewer();

function init3DViewer() {
  // Set up scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(45, 2, 0.1, 1000);
  camera.position.set(0, 1.6, 3);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth * 0.66, window.innerHeight - 80);
  document.getElementById("viewer").appendChild(renderer.domElement);

  // Light
  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  scene.add(light);

  // Load GLTF model
  const loader = new THREE.GLTFLoader();
  loader.load("skeleton.glb", function (gltf) {
    skeletonModel = gltf.scene;
    skeletonModel.traverse((child) => {
      if (child.isMesh) {
        child.material.transparent = true;
        child.material.opacity = 0.5;
      }
    });

    skeletonModel.scale.set(1, 1, 1);
    skeletonModel.position.set(0, -1.5, 0);
    scene.add(skeletonModel);
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function animateSkeleton(sep, trunk, leg) {
  if (!skeletonModel) return;

  // Example: rotate spine
  const spine = skeletonModel.getObjectByName("Spine");
  if (spine) {
    spine.rotation.y = THREE.MathUtils.degToRad(sep);
  }

  const hips = skeletonModel.getObjectByName("Hips");
  if (hips) {
    hips.rotation.z = THREE.MathUtils.degToRad(trunk);
  }

  const leftLeg = skeletonModel.getObjectByName("LeftUpLeg");
  if (leftLeg) {
    leftLeg.rotation.x = THREE.MathUtils.degToRad(leg);
  }
}

animateSkeleton(sep, trunk, leg);

function calculate() {
    const height = parseFloat(document.getElementById('height').value);
    const arm = parseFloat(document.getElementById('arm').value);
    const sep = parseFloat(document.getElementById('sep').value);
    const leg = parseFloat(document.getElementById('leg').value);
    const trunk = parseFloat(document.getElementById('trunk').value);
    const explosiveness = parseFloat(document.getElementById('explosiveness').value);
  
    const torque = sep * 1.3 + trunk * 0.7;
    const powerScore = torque + explosiveness * 10;
    const speed = 60 + (powerScore / 5);
  
    document.getElementById('output').innerHTML = `
      ⚡ Estimated Ball Speed: <strong>${speed.toFixed(1)} mph</strong><br>
      ⚙️ Efficiency Score: <strong>${Math.min(100, powerScore.toFixed(1))}/100</strong>
    `;
  }
  