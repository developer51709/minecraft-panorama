const stage = document.querySelector("#stage");
const canvas = document.querySelector("#panorama");
const gallery = document.querySelector("#gallery");
const filters = document.querySelector("#filters");
const searchInput = document.querySelector("#search");
const loading = document.querySelector("#loading");
const rotationButton = document.querySelector("#rotation-button");
const resetButton = document.querySelector("#reset-button");
const fullscreenButton = document.querySelector("#fullscreen-button");
const debugDot = document.querySelector("#debug-dot");
const state = { panoramas: [], visible: [], activeId: null, category: "all", query: "", yaw: 0, pitch: 0, dragging: false, rotating: true };
let THREE;
let renderer;
let camera;
let scene;
let activeTexture;
let lastFrame = 0;
let debugGroup;
let debugEnabled = false;

// CubeTextureLoader expects faces in the order +X, -X, +Y, -Y, +Z, -Z.
// Minecraft packs store panoramas as 0 front, 1 right, 2 back, 3 left, 4 up, 5 down,
// so remap them to keep panorama_4 as the sky and panorama_5 as the ground.
// Verified with debug mode: this archive ships panorama_0 / panorama_2 swapped
// relative to that convention (front/back), so keep them swapped here.
const CUBE_FACE_ORDER = [1, 3, 4, 5, 0, 2];

function cubeFaceUrls(panorama) {
  return CUBE_FACE_ORDER.map((index) => panorama.faces[index]);
}

// Debug view: triple-tap the green header dot to label each cube face with the
// panorama_N.png file mapped onto it and outline the face boundaries.
const CUBE_SLOT_POSITIONS = [
  [1, 0, 0], [-1, 0, 0],
  [0, 1, 0], [0, -1, 0],
  [0, 0, 1], [0, 0, -1],
];
const DEBUG_BOX_SIZE = 8;

function createFaceLabel(index) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  context.fillStyle = "rgba(10, 19, 13, 0.82)";
  context.fillRect(0, 0, size, size);
  context.lineWidth = 10;
  context.strokeStyle = "#c6ed65";
  context.strokeRect(5, 5, size - 10, size - 10);
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#c6ed65";
  context.font = "500 150px 'DM Mono', monospace";
  context.fillText(String(index), size / 2, size / 2 - 20);
  context.fillStyle = "#f4f6ea";
  context.font = "500 28px 'DM Mono', monospace";
  context.fillText(`panorama_${index}`, size / 2, size - 40);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false, depthWrite: false, toneMapped: false }));
  sprite.renderOrder = 3;
  return sprite;
}

function buildDebugOverlay() {
  const group = new THREE.Group();
  group.visible = false;
  const half = DEBUG_BOX_SIZE / 2;
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(DEBUG_BOX_SIZE, DEBUG_BOX_SIZE, DEBUG_BOX_SIZE)),
    new THREE.LineBasicMaterial({ color: 0xc6ed65, transparent: true, opacity: 0.85, depthTest: false, depthWrite: false }),
  );
  edges.renderOrder = 2;
  group.add(edges);
  CUBE_FACE_ORDER.forEach((fileIndex, slot) => {
    const [x, y, z] = CUBE_SLOT_POSITIONS[slot];
    const label = createFaceLabel(fileIndex);
    label.position.set(x * half * 0.99, y * half * 0.99, z * half * 0.99);
    label.scale.set(2.2, 2.2, 1);
    group.add(label);
  });
  return group;
}

function setDebug(enabled) {
  debugEnabled = enabled;
  if (debugGroup) debugGroup.visible = enabled;
  debugDot.classList.toggle("is-debug", enabled);
  debugDot.setAttribute("aria-pressed", String(enabled));
  debugDot.title = enabled ? "Debug view on - triple-tap to hide" : "Triple-tap for debug view";
}

function setLoading(message, isError = false) {
  loading.textContent = message;
  loading.classList.remove("is-hidden");
  loading.classList.toggle("is-error", isError);
}

function hideLoading() {
  loading.classList.add("is-hidden");
}

function startRenderer() {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(stage.clientWidth, stage.clientHeight, false);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(72, stage.clientWidth / stage.clientHeight, 0.1, 10);
  camera.rotation.order = "YXZ";
  new ResizeObserver(() => {
    if (!renderer || !camera) return;
    camera.aspect = stage.clientWidth / stage.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(stage.clientWidth, stage.clientHeight, false);
  }).observe(stage);
  debugGroup = buildDebugOverlay();
  scene.add(debugGroup);
  renderer.setAnimationLoop(animate);
}

function animate(time) {
  const delta = Math.min((time - lastFrame) / 1000, 0.05);
  lastFrame = time;
  if (state.rotating && !state.dragging) state.yaw -= delta * 0.035;
  camera.rotation.set(state.pitch, state.yaw, 0);
  renderer.render(scene, camera);
}

function loadPanorama(panorama) {
  state.activeId = panorama.id;
  state.yaw = 0;
  state.pitch = 0;
  setLoading("Loading panorama");
  new THREE.CubeTextureLoader().load(cubeFaceUrls(panorama), (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    if (activeTexture) activeTexture.dispose();
    activeTexture = texture;
    scene.background = texture;
    document.querySelector("#edition-tag").textContent = panorama.category;
    document.querySelector("#scene-category").textContent = panorama.category;
    document.querySelector("#scene-name").textContent = panorama.title;
    document.querySelector("#scene-index").textContent = `${String(state.panoramas.indexOf(panorama) + 1).padStart(2, "0")} / ${state.panoramas.length}`;
    document.querySelectorAll(".panorama-card").forEach((card) => {
      card.setAttribute("aria-current", String(card.dataset.id === panorama.id));
    });
    hideLoading();
  }, undefined, () => setLoading("Could not load this panorama", true));
}

function enableDebugToggle() {
  let taps = [];
  debugDot.addEventListener("click", () => {
    const now = performance.now();
    taps = taps.filter((time) => now - time < 800);
    taps.push(now);
    if (taps.length >= 3) {
      taps = [];
      setDebug(!debugEnabled);
    }
  });
  debugDot.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setDebug(!debugEnabled);
    }
  });
}

function renderFilters(groups) {
  filters.replaceChildren();
  const options = [{ id: "all", label: "All editions" }, ...groups.map((group) => ({ id: group.id, label: group.label }))];
  for (const option of options) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-button";
    button.textContent = option.label;
    button.dataset.category = option.id;
    button.setAttribute("aria-pressed", String(state.category === option.id));
    button.addEventListener("click", () => {
      state.category = option.id;
      renderFilters(groups);
      renderGallery();
    });
    filters.append(button);
  }
}

function renderGallery() {
  const query = state.query.trim().toLowerCase();
  state.visible = state.panoramas.filter((panorama) => {
    const categoryMatches = state.category === "all" || panorama.categoryId === state.category;
    const searchMatches = !query || `${panorama.title} ${panorama.category}`.toLowerCase().includes(query);
    return categoryMatches && searchMatches;
  });
  document.querySelector("#collection-count").textContent = `${state.visible.length} PANORAMAS`;
  gallery.replaceChildren();
  if (state.visible.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No panoramas match that search.";
    gallery.append(empty);
    return;
  }
  state.visible.forEach((panorama, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "panorama-card";
    card.dataset.id = panorama.id;
    card.setAttribute("aria-current", String(panorama.id === state.activeId));
    card.setAttribute("aria-label", `View ${panorama.title}, ${panorama.category}`);
    const image = document.createElement("img");
    image.className = "card-image";
    image.src = panorama.faces[0];
    image.alt = "";
    image.loading = "lazy";
    const info = document.createElement("span");
    info.className = "card-info";
    const text = document.createElement("span");
    text.innerHTML = '<span class="card-name"></span><span class="card-category"></span>';
    text.querySelector(".card-name").textContent = panorama.title;
    text.querySelector(".card-category").textContent = panorama.category;
    const number = document.createElement("span");
    number.className = "card-number";
    number.textContent = String(index + 1).padStart(2, "0");
    info.append(text, number);
    card.append(image, info);
    card.addEventListener("click", () => loadPanorama(panorama));
    gallery.append(card);
  });
}

function setRotation(isRotating) {
  state.rotating = isRotating;
  rotationButton.setAttribute("aria-label", isRotating ? "Pause automatic rotation" : "Resume automatic rotation");
  rotationButton.title = isRotating ? "Pause rotation" : "Resume rotation";
  rotationButton.innerHTML = isRotating
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h3v14H8zm5 0h3v14h-3z" /></svg>';
}

function enableControls() {
  enableDebugToggle();
  rotationButton.addEventListener("click", () => setRotation(!state.rotating));
  resetButton.addEventListener("click", () => { state.yaw = 0; state.pitch = 0; });
  fullscreenButton.addEventListener("click", async () => {
    if (!document.fullscreenElement) await stage.requestFullscreen?.();
    else await document.exitFullscreen?.();
  });
  document.addEventListener("fullscreenchange", () => {
    const isFullscreen = Boolean(document.fullscreenElement);
    fullscreenButton.setAttribute("aria-label", isFullscreen ? "Exit full screen" : "Enter full screen");
    renderer?.setSize(stage.clientWidth, stage.clientHeight, false);
  });
  canvas.addEventListener("pointerdown", (event) => {
    state.dragging = true;
    canvas.setPointerCapture(event.pointerId);
    canvas.dataset.pointerX = String(event.clientX);
    canvas.dataset.pointerY = String(event.clientY);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!state.dragging) return;
    const deltaX = event.clientX - Number(canvas.dataset.pointerX);
    const deltaY = event.clientY - Number(canvas.dataset.pointerY);
    state.yaw -= deltaX * 0.004;
    state.pitch = THREE.MathUtils.clamp(state.pitch - deltaY * 0.004, -1.35, 1.35);
    canvas.dataset.pointerX = String(event.clientX);
    canvas.dataset.pointerY = String(event.clientY);
  });
  for (const eventName of ["pointerup", "pointercancel", "lostpointercapture"]) {
    canvas.addEventListener(eventName, () => { state.dragging = false; });
  }
  searchInput.addEventListener("input", () => {
    state.query = searchInput.value;
    renderGallery();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setRotation(false);
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      const currentIndex = state.visible.findIndex((panorama) => panorama.id === state.activeId);
      if (currentIndex < 0 || !state.visible.length) return;
      const offset = event.key === "ArrowRight" ? 1 : -1;
      const next = state.visible[(currentIndex + offset + state.visible.length) % state.visible.length];
      loadPanorama(next);
    }
  });
}

async function init() {
  try {
    const [threeModule, response] = await Promise.all([
      import("https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js"),
      fetch("./assets/catalog.json"),
    ]);
    if (!response.ok) throw new Error("Catalog is missing. Run node scripts/build-catalog.mjs first.");
    THREE = threeModule;
    const catalog = await response.json();
    state.panoramas = catalog.panoramas;
    startRenderer();
    enableControls();
    renderFilters(catalog.groups);
    renderGallery();
    if (!state.panoramas.length) throw new Error("No six-face panorama sets were found in assets.");
    loadPanorama(state.panoramas[0]);
  } catch (error) {
    console.error(error);
    setLoading(error.message || "Could not open the panorama archive", true);
  }
}

init();