<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ArtModal from "../Modal/ArtModal.vue";
import WebModal from "../Modal/WebModal.vue";
import GameModal from "../Modal/GameModal.vue";
import clickSfxFile from "../../assets/audio/click-main.mp3"; // <-- (1) Import Audio

// --- SETUP AUDIO ---
const clickAudio = new Audio(clickSfxFile);
clickAudio.volume = 0.1; // <-- (2) Volume sesuai request (0.1)

const playClickSound = () => {
  clickAudio.currentTime = 0;
  clickAudio.play().catch((e) => console.error(e));
};

// --- STATE MODAL ---
const showArtModal = ref(false);
const showWebModal = ref(false);
const showGameModal = ref(false);

// --- FUNGSI KLIK (Bunyi + Buka Modal) ---
const openArt = () => {
  playClickSound();
  showArtModal.value = true;
};

const openWeb = () => {
  playClickSound();
  showWebModal.value = true;
};

const openGame = () => {
  playClickSound();
  showGameModal.value = true;
};

// ESC untuk nutup semua modal
const onKeydown = (e) => {
  if (e.key === "Escape") {
    showArtModal.value = false;
    showWebModal.value = false;
    showGameModal.value = false;
  }
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center text-[#993f4b] text-base mt-6">
    <div class="text-center sm:col-span-1">
      <h1 class="text-4xl font-bold mb-4">Art</h1>
      <p class="leading-relaxed text-[#573440] text-xs max-sm:text-sm">
        I enjoy making art in my free time. I often use references and I’m still learning to draw (✿´‿`).
      </p>

      <button
        class="block my-4 mx-auto px-2 py-1 border border-[#573440] rounded text-xs transition-transform duration-200 hover:scale-103 cursor-pointer hover:bg-bg-hover"
        @click="openArt">
        see my artworks
      </button>
    </div>

    <div class="text-center sm:col-span-1 px-4">
      <h1 class="text-4xl font-bold mb-4">Web</h1>
      <p class="leading-relaxed text-[#573440] text-xs max-sm:text-sm">
        I enjoy building websites, mostly focusing on front-end development. I work with HTML, CSS, JavaScript, and
        sometimes use framework like Vue.js to make development easier(⌐■_■).
      </p>

      <button
        class="block my-4 mx-auto px-2 py-1 border border-[#573440] rounded text-xs transition-transform duration-200 hover:scale-103 cursor-pointer hover:bg-bg-hover"
        @click="openWeb">
        see my web projects
      </button>
    </div>

    <div class="text-center sm:col-span-1 px-4">
      <h1 class="text-4xl font-bold mb-4">Game</h1>
      <p class="leading-relaxed text-[#573440] text-xs max-sm:text-sm">
        I also tried making a game once… well, not really by choice. It was a college assignment, but I finished it and
        surprisingly had fun (≧◡≦)!
      </p>

      <button
        class="block my-4 mx-auto px-2 py-1 border border-[#573440] rounded text-xs transition-transform duration-200 hover:scale-103 cursor-pointer hover:bg-bg-hover"
        @click="openGame">
        see my game
      </button>
    </div>

    <ArtModal :open="showArtModal" @close="showArtModal = false" />
    <WebModal :open="showWebModal" @close="showWebModal = false" />
    <GameModal :open="showGameModal" @close="showGameModal = false" />
  </div>
</template>

<style scoped>
/* kosong — semua styling via Tailwind */
</style>
