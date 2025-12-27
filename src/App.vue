<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// IMPORT AUDIO
// Menggunakan relative path dari App.vue ke folder assets
import clickSfx from "./assets/audio/click-main.mp3";

// State tema
const isDark = ref(false);
let observer = null;

// State Partikel
const fireflies = ref([]);
const sakuraPetals = ref([]);

// State Toggle Animasi (Default: True/Nyala)
const showAnimation = ref(true);

// 1. GENERATE KUNANG-KUNANG (Dark Mode)
const generateFireflies = () => {
  const count = 20;
  const temp = [];
  for (let i = 0; i < count; i++) {
    temp.push({
      id: i,
      left: Math.random() * 100 + "%",
      size: Math.random() * 3 + 2 + "px",
      duration: Math.random() * 10 + 15 + "s",
      delay: "-" + Math.random() * 20 + "s",
      moveX: Math.random() * 100 - 50 + "px",
    });
  }
  fireflies.value = temp;
};

// 2. GENERATE SAKURA (Light Mode)
const generateSakura = () => {
  const count = 15;
  const temp = [];
  for (let i = 0; i < count; i++) {
    temp.push({
      id: i,
      left: Math.random() * 100 + "%",
      duration: Math.random() * 5 + 10 + "s",
      delay: Math.random() * 5 + "s",
      size: Math.random() * 5 + 5 + "px",
    });
  }
  sakuraPetals.value = temp;
};

// Fungsi Toggle Animasi + Suara
const toggleAnimation = () => {
  // 1. Mainkan Suara
  const audio = new Audio(clickSfx);
  audio.volume = 0.5; // Volume 50% agar tidak terlalu keras
  audio.play().catch((err) => console.log("Audio play error:", err));

  // 2. Ubah State Animasi
  showAnimation.value = !showAnimation.value;

  // 3. Simpan ke LocalStorage
  localStorage.setItem("bgAnimation", showAnimation.value);
};

const checkTheme = () => {
  isDark.value = document.documentElement.classList.contains("dark") || document.body.classList.contains("dark");
};

onMounted(() => {
  checkTheme();

  // Cek apakah user pernah mematikan animasi sebelumnya
  const savedAnim = localStorage.getItem("bgAnimation");
  if (savedAnim !== null) {
    showAnimation.value = savedAnim === "true";
  }

  generateFireflies();
  generateSakura();

  observer = new MutationObserver(checkTheme);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <div
    class="relative w-full min-h-screen bg-bg-primary text-text-primary transition-colors duration-700 overflow-hidden">
    <div v-if="showAnimation">
      <div
        class="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ease-in-out"
        :class="isDark ? 'opacity-0' : 'opacity-100'">
        <div class="sakura-container">
          <div
            v-for="petal in sakuraPetals"
            :key="petal.id"
            class="sakura"
            :style="{
              left: petal.left,
              width: petal.size,
              height: petal.size,
              '--duration': petal.duration,
              '--delay': petal.delay,
            }"></div>
        </div>
      </div>

      <div
        class="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ease-in-out"
        :class="isDark ? 'opacity-100' : 'opacity-0'">
        <div class="fireflies-container">
          <div
            v-for="fly in fireflies"
            :key="fly.id"
            class="firefly-wrapper"
            :style="{
              left: fly.left,
              '--duration': fly.duration,
              '--delay': fly.delay,
              '--move-x': fly.moveX,
            }">
            <div class="firefly-glow" :style="{ width: fly.size, height: fly.size }"></div>
          </div>
        </div>
      </div>
    </div>
    <button
      @click="toggleAnimation"
      class="fixed bottom-5 left-5 z-50 p-2 rounded-full border transition-all duration-300 group hover:scale-110 focus:outline-none shadow-lg cursor-pointer"
      :class="[
        isDark
          ? 'bg-slate-900/50 border-slate-700 text-yellow-400 hover:bg-slate-800/80 hover:shadow-yellow-400/20'
          : 'bg-white/50 border-white text-red-400 hover:bg-white/80 hover:shadow-red-400/20',
      ]"
      style="backdrop-filter: blur(8px)"
      :title="showAnimation ? 'Matikan Animasi' : 'Nyalakan Animasi'">
      <svg
        v-if="showAnimation"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-sparkles">
        <path
          d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>

      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-eye-off">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
      </svg>
    </button>

    <div class="relative z-10 font-display w-full min-h-screen flex flex-col">
      <RouterView />
    </div>
  </div>
</template>

<style>
/* ========================================= */
/* STYLE: SAKURA (JATUH)                     */
/* ========================================= */
.sakura-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.sakura {
  position: absolute;
  top: -10%;
  background: #fca5a5;
  opacity: 0.25;
  border-radius: 100% 0 100% 0;

  animation: sakuraFall var(--duration) linear infinite;
  animation-delay: var(--delay);
}

@keyframes sakuraFall {
  0% {
    top: -10%;
    transform: translateX(0) rotate(0deg);
  }
  25% {
    transform: translateX(15px) rotate(45deg);
  }
  50% {
    transform: translateX(-15px) rotate(90deg);
  }
  75% {
    transform: translateX(15px) rotate(135deg);
  }
  100% {
    top: 110%;
    transform: translateX(0) rotate(180deg);
  }
}

/* ========================================= */
/* STYLE: FIREFLIES (NAIK)                   */
/* ========================================= */
.fireflies-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.firefly-wrapper {
  position: absolute;
  bottom: -10vh;
  transform: translateX(0);
  animation: fireflyRise var(--duration) linear infinite;
  animation-delay: var(--delay);
  will-change: transform;
}

.firefly-glow {
  background: #fcd34d;
  border-radius: 50%;
  box-shadow: 0 0 5px #fcd34d, 0 0 10px rgba(251, 191, 36, 0.5);
  animation: fireflyBlink 3s ease-in-out infinite alternate;
}

@keyframes fireflyRise {
  to {
    transform: translateX(var(--move-x)) translateY(-120vh);
  }
}

@keyframes fireflyBlink {
  0% {
    opacity: 0.1;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
  100% {
    opacity: 0.1;
    transform: scale(0.8);
  }
}
</style>
