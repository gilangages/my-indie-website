<script setup>
import { ref, onMounted } from "vue";

// --- 1. IMPORT ASSETS ---
import iconMusicOff from "../../assets/svg/music-off.svg?url";
import iconMusicOn from "../../assets/svg/music-on.svg?url";
import iconThemeNight from "../../assets/svg/theme-night.svg?url";
import iconThemeLight from "../../assets/svg/theme-light.svg?url";

// Import Audio Files
import bgmFile from "../../assets/audio/whas-it-a-dream.mp3";
import clickSfxFile from "../../assets/audio/click-main.mp3"; // Import efek suara klik

// --- SETUP SOUND EFFECT (SFX) ---
const clickAudio = new Audio(clickSfxFile);
clickAudio.volume = 0.1; // Atur volume suara klik

const playClickSound = () => {
  clickAudio.currentTime = 0;
  clickAudio.play().catch((e) => console.error("SFX Error:", e));
};

// --- 2. LOGIC MUSIC ---
const isPlaying = ref(false);
const audio = new Audio(bgmFile);
audio.loop = true;
audio.volume = 0.2;

const toggleMusic = () => {
  // HAPUS playClickSound() dari sini sesuai request
  if (isPlaying.value) {
    audio.pause();
    isPlaying.value = false;
  } else {
    audio.currentTime = 0;
    audio.play().catch((e) => console.error(e));
    isPlaying.value = true;
  }
};

// --- 3. LOGIC THEME ---
const isDark = ref(false);

const applyTheme = (darkValue) => {
  if (darkValue) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    isDark.value = true;
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    isDark.value = false;
  }
};

onMounted(() => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    applyTheme(true);
  } else {
    applyTheme(false);
  }
});

const toggleTheme = () => {
  playClickSound(); // HANYA DI SINI (Tombol Theme)
  applyTheme(!isDark.value);
};
</script>

<template>
  <div class="flex ml-12 max-sm:ml-4 min-md:mb-4 mt-8 gap-4">
    <span class="icon" @click="toggleTheme">
      <img
        :src="isDark ? iconThemeNight : iconThemeLight"
        alt="Theme Toggle"
        class="w-9 transition-transform duration-200 hover:scale-115 cursor-pointer" />
    </span>

    <span class="icon" @click="toggleMusic">
      <img
        :src="isPlaying ? iconMusicOn : iconMusicOff"
        alt="Music Toggle"
        class="w-10 transition-transform duration-200 hover:scale-115 cursor-pointer" />
    </span>
  </div>
</template>

<style scoped>
/* CSS bawaanmu */
</style>
