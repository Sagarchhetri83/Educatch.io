// Core Game Module logic for EduCatch
// Displays webcam, detects hand with MediaPipe Tasks, draws landmarks,
// and moves a custom cursor to the user's index fingertip.

// Import types and factories from the MediaPipe Tasks Vision ESM bundle
// The <script type="module"> in index.html loads the library on the page,
// so these imports pull from the global module registry (CDN ESM).
import {
  FilesetResolver,
  HandLandmarker,
  DrawingUtils
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";

// Part 1: Initialization
const containerEl = document.getElementById("container");
const videoEl = document.getElementById("webcam");
const canvasEl = document.getElementById("output_canvas");
const canvasCtx = canvasEl.getContext("2d");
const cursorEl = document.getElementById("cursor");
const loadingEl = document.getElementById("loading");
const scoreEl = document.getElementById("score-display");
const startButtonEl = document.getElementById("startButton");
const gameOverScreenEl = document.getElementById("game-over-screen");
const finalScoreEl = document.getElementById("final-score");
const returnButtonEl = document.getElementById("return-button");

let handLandmarker = null;
let lastVideoTime = -1;
let drawingUtils = null;

// --- Game State ---
let isGameRunning = false;
let score = 0;
// Active letter elements currently on screen. Each entry tracks the DOM node and its character.
let activeLetters = []; // { el: HTMLElement, char: string }
let spawnTimer = null; // no longer used after A–Z mode, kept for safety clears
let lastCaughtLetter = null; // used to validate speech recognition

// Leveled content for the English module. Easily extensible for future levels.
const englishModule = [
  {
    level: 1,
    name: "Basic Alphabets",
    items: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
  },
  {
    level: 2,
    name: "Simple Words",
    items: [
      "APPLE","BALL","CAT","DOG","EGG","FISH","GOAT","HAT","ICE","JAM",
      "KITE","LION","MANGO","NEST","ORANGE","PIG","QUEEN","RAINBOW","SUN","TREE",
      "UMBRELLA","VASE","WATCH","XYLOPHONE","YOYO","ZEBRA"
    ]
  }
];
let currentLevelIndex = 0; // which level in englishModule we are on
let currentItemIndex = 0;  // which item within the current level we expect next

/**
 * Initializes the MediaPipe HandLandmarker.
 * - Loads the necessary WASM bundle
 * - Creates the handLandmarker with VIDEO mode and a single hand for efficiency
 */
async function initializeHandLandmarker() {
  // Show loading indicator while model is being prepared
  loadingEl.style.display = "block";

  // Resolve local paths to the WASM assets used by the Tasks library
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
  );

  // Create the hand landmarker with options
  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      // Pretrained hand landmark model hosted by Google
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
    },
    runningMode: "VIDEO",
    numHands: 1
  });

  // Ready to draw
  drawingUtils = new DrawingUtils(canvasCtx);

  // Hide loading indicator once the model is ready
  loadingEl.style.display = "none";
}

// Part 2: Camera and Game Loop
/**
 * Requests access to the webcam and starts the prediction loop.
 */
async function enableWebcam() {
  const constraints = { video: { width: 640, height: 480 } };
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  videoEl.srcObject = stream;
  await videoEl.play();
  requestAnimationFrame(predictWebcam);
}

/**
 * Main loop: runs on each animation frame.
 * - Detects hands in the current video frame
 * - Draws landmarks and connectors
 * - Moves the custom cursor to the index fingertip (landmark #8)
 */
function predictWebcam() {
  const nowInMs = Date.now();
  // Avoid reprocessing the same frame
  if (videoEl.currentTime === lastVideoTime) {
    requestAnimationFrame(predictWebcam);
    return;
  }
  lastVideoTime = videoEl.currentTime;

  // Run detection
  const results = handLandmarker.detectForVideo(videoEl, nowInMs);

  // Clear canvas
  canvasCtx.clearRect(0, 0, canvasEl.width, canvasEl.height);

  if (results && results.landmarks && results.landmarks.length > 0) {
    const landmarks = results.landmarks[0];

    // Draw landmarks and connections
    drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, {
      color: "#0ea5e9",
      lineWidth: 2
    });
    drawingUtils.drawLandmarks(landmarks, { color: "#22d3ee", lineWidth: 1 });

    // Index fingertip is landmark #8 (normalized coordinates 0..1)
    const indexTip = landmarks[8];
    if (indexTip) {
      // Convert normalized coords to pixels that match the canvas size
      // Note: because the video/canvas are mirrored via CSS transform: scaleX(-1),
      // we also mirror the X coordinate so the cursor tracks naturally.
      const xPixels = (1 - indexTip.x) * canvasEl.width; // mirror X
      const yPixels = indexTip.y * canvasEl.height;

      // Position the cursor element
      cursorEl.style.left = `${xPixels}px`;
      cursorEl.style.top = `${yPixels}px`;

      // If game is running, check collisions using the
      // fingertip position in container pixel coordinates
      if (isGameRunning) {
        checkCollisions(xPixels, yPixels);
      }
    }
  }

  requestAnimationFrame(predictWebcam);
}

// ---- Spawning (Stationary letters) ----
function stopSpawning() {
  if (spawnTimer) {
    clearInterval(spawnTimer);
    spawnTimer = null;
  }
}

function spawnLetter(letterToSpawn) {
  // Create a stationary letter element at a random position inside the game area (#container).
  // The letter is absolutely positioned and does not move after creation.
  const el = document.createElement("div");
  el.className = "letter";
  const char = letterToSpawn;
  el.innerText = letterToSpawn;

  const containerWidth = containerEl.clientWidth;
  const containerHeight = containerEl.clientHeight;

  // Random positioning logic:
  // - Choose a random (x, y) within the container's dimensions.
  // - Use a small margin so the letter does not spawn too close to the edges,
  //   keeping it fully visible inside the game area.
  const margin = 50;
  const randomX = Math.random() * Math.max(0, containerWidth - margin) + margin / 2;
  const randomY = Math.random() * Math.max(0, containerHeight - margin) + margin / 2;

  el.style.left = `${randomX}px`;
  el.style.top = `${randomY}px`;

  containerEl.appendChild(el);

  activeLetters.push({ el, char });

  // Self-destruct timer:
  // If the letter was not "caught" (no burst animation applied) within 4000 ms,
  // remove it from the DOM and from the activeLetters array to avoid clutter.
  setTimeout(() => {
    if (!el.classList.contains("burst") && el.parentNode) {
      el.parentNode.removeChild(el);
      const idx = activeLetters.findIndex((l) => l.el === el);
      if (idx !== -1) {
        activeLetters.splice(idx, 1);
      }
    }
  }, 4000);
}

// ---- Collision Detection ----
function checkCollisions(cursorX, cursorY) {
  // cursorX, cursorY are pixel coordinates relative to the container/canvas
  // For robust hit-testing against DOM elements, convert cursor into viewport coords
  const containerRect = containerEl.getBoundingClientRect();
  const clientX = containerRect.left + cursorX;
  const clientY = containerRect.top + cursorY;

  // Track which indices to remove after processing
  const toRemove = [];

  for (let i = 0; i < activeLetters.length; i++) {
    const letter = activeLetters[i];
    if (!letter || !letter.el) {
      continue;
    }
    const rect = letter.el.getBoundingClientRect();

    // Basic point-in-rectangle test
    const withinX = clientX >= rect.left && clientX <= rect.right;
    const withinY = clientY >= rect.top && clientY <= rect.bottom;
    if (withinX && withinY) {
      // Collision detected. Only accept if it matches the expected item for the level
      const expected = englishModule[currentLevelIndex].items[currentItemIndex];
      if (letter.char === expected) {
        handleCatch(i);
        // Advance progression and spawn the next item after a short delay
        currentItemIndex += 1;
        setTimeout(spawnNextItem, 1000);
        // Exit after a valid catch this frame
        break;
      }
    }
  }
}

// ---- Catch Action ----
function handleCatch(index) {
  const letter = activeLetters[index];
  if (!letter) {
    return;
  }

  // Update score
  score += 1;
  updateScore();

  // Visual feedback: burst animation and removal
  letter.el.classList.add("burst");
  const removeAfter = 300;
  setTimeout(() => {
    if (letter.el && letter.el.parentNode) {
      letter.el.parentNode.removeChild(letter.el);
    }
  }, removeAfter);

  // Audio feedback
  speak(letter.char);
  lastCaughtLetter = letter.char;

  // Remove from active array immediately to avoid multi-detections
  activeLetters.splice(index, 1);

  // Start speech recognition challenge
  startRecognition();
}

function updateScore() {
  if (scoreEl) {
    scoreEl.textContent = `Score: ${score}`;
  }
}

// ---- UI: Start Button ----
if (startButtonEl) {
  startButtonEl.addEventListener("click", startGame);
}

function startGame() {
  // Reset score and progression within the current level
  score = 0;
  updateScore();
  currentItemIndex = 0;

  // Update level display
  const levelDisplay = document.getElementById("level-display");
  if (levelDisplay) {
    levelDisplay.textContent = `Level: ${englishModule[currentLevelIndex].level}`;
  }

  // Hide game over screen if visible
  if (gameOverScreenEl) {
    gameOverScreenEl.style.display = "none";
  }

  // Clear any existing letters in DOM and state
  for (const l of activeLetters) {
    if (l.el && l.el.parentNode) {
      l.el.parentNode.removeChild(l.el);
    }
  }
  activeLetters = [];

  // Start game and spawn the first item for this level
  isGameRunning = true;
  spawnNextItem();
}

function spawnNextItem() {
  if (!isGameRunning) {
    return;
  }
  const currentItems = englishModule[currentLevelIndex].items;
  // If we just finished the last item in this level
  if (currentItemIndex >= currentItems.length) {
    // Is there another level?
    if (currentLevelIndex < englishModule.length - 1) {
      // Show Level Complete briefly, then advance
      const titleEl = gameOverScreenEl ? gameOverScreenEl.querySelector("h2") : null;
      if (titleEl) {
        titleEl.textContent = "Level Complete!";
      }
      if (finalScoreEl) {
        finalScoreEl.textContent = `Your Score: ${score}`;
      }
      if (gameOverScreenEl) {
        gameOverScreenEl.style.display = "flex";
      }
      setTimeout(() => {
        // Hide overlay and start next level
        if (gameOverScreenEl) {
          gameOverScreenEl.style.display = "none";
        }
        currentLevelIndex += 1;
        currentItemIndex = 0;
        // Update level display for the next level
        const levelDisplay2 = document.getElementById("level-display");
        if (levelDisplay2) {
          levelDisplay2.textContent = `Level: ${englishModule[currentLevelIndex].level}`;
        }
        spawnNextItem();
      }, 1500);
      return;
    }
    // No more levels: module complete
    endGame("Congratulations! You've finished the English Module!");
    return;
  }
  const nextItem = currentItems[currentItemIndex];
  spawnLetter(nextItem);
}

// Timer functions removed in A–Z mode

function endGame(message) {
  // Stop game state and any spawning safety
  isGameRunning = false;
  stopSpawning();

  // Remove any remaining letters
  for (const l of activeLetters) {
    if (l.el && l.el.parentNode) {
      l.el.parentNode.removeChild(l.el);
    }
  }
  activeLetters = [];

  // Update overlay contents
  const titleEl = gameOverScreenEl ? gameOverScreenEl.querySelector("h2") : null;
  if (titleEl && message) {
    titleEl.textContent = message;
  }
  if (finalScoreEl) {
    finalScoreEl.textContent = `Your Score: ${score}`;
  }
  if (gameOverScreenEl) {
    gameOverScreenEl.style.display = "flex"; // centered overlay uses flex
  }
}

// ---- Audio and Speech ----
function speak(text) {
  try {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  } catch (e) {
    // Non-fatal if speech not supported
    console.warn("Speech synthesis unavailable:", e);
  }
}

let recognition = null;
function ensureRecognition() {
  if (recognition) {
    return recognition;
  }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    return null;
  }
  recognition = new SR();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = (event) => {
    try {
      const transcript = (event.results?.[0]?.[0]?.transcript || "").trim();
      if (!transcript || !lastCaughtLetter) {
        return;
      }
      // Compare first character case-insensitively
      const firstChar = transcript[0].toUpperCase();
      if (firstChar === lastCaughtLetter.toUpperCase()) {
        // Bonus point for correct pronunciation
        score += 1;
        updateScore();
        console.log("Correct! +1 bonus");
      } else {
        console.log("Heard:", transcript, "expected:", lastCaughtLetter);
      }
    } catch (e) {
      console.warn("Recognition handler error:", e);
    }
  };
  recognition.onend = () => {
    // Do not auto-restart; we trigger after each catch
  };
  recognition.onerror = (e) => {
    console.warn("Speech recognition error:", e);
  };
  return recognition;
}

function startRecognition() {
  const rec = ensureRecognition();
  if (!rec) {
    return;
  }
  try {
    // Small delay to avoid overlapping with speech synthesis
    setTimeout(() => {
      try {
        rec.start();
      } catch (_) {
        /* ignore if already started */
      }
    }, 350);
  } catch (e) {
    console.warn("Unable to start recognition:", e);
  }
}

// ---- Return to Dashboard ----
if (returnButtonEl) {
  returnButtonEl.addEventListener("click", () => {
    try {
      localStorage.setItem("lastGameScore", String(score));
    } catch (_) {
      // ignore storage errors
    }
    // Prototype navigation. In a real app, use your router (e.g., navigate('/dashboard')).
    window.location.href = "/dashboard.html";
  });
}

// Dashboard side (for reference):
// On the dashboard page script, read and display the last score:
// const stored = localStorage.getItem('lastGameScore');
// if (stored) {
//   showScoreToUser(stored);
//   localStorage.removeItem('lastGameScore');
// }

// Part 3: Execution
(async () => {
  try {
    await initializeHandLandmarker();
    await enableWebcam();
  } catch (err) {
    console.error("Initialization error:", err);
    loadingEl.textContent = "Failed to initialize. Please refresh.";
  }
})();


