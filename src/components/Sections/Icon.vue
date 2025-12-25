<script setup>
import { ref, onMounted } from "vue";

// --- 1. IMPORT ASSETS ---
// Import Gambar Icon Music
import iconMusicOff from "../../assets/svg/music-off.svg?url";
import iconMusicOn from "../../assets/svg/music-on.svg?url";

// Import Gambar Icon Theme (Baru)
import iconThemeNight from "../../assets/svg/theme-night.svg?url"; // Icon Bulan
import iconThemeLight from "../../assets/svg/theme-light.svg?url"; // Icon Matahari

// Import File Musik
// Pastikan file ini benar-benar ada di folder tersebut
import bgmFile from "../../assets/audio/whas-it-a-dream.mp3";

// --- 2. LOGIC MUSIC (Sesuai Kodemu) ---
const isPlaying = ref(false);
const audio = new Audio(bgmFile);

audio.loop = true;
audio.volume = 0.2;

const toggleMusic = () => {
  if (isPlaying.value) {
    // KONDISI 1: Matikan
    audio.pause();
    isPlaying.value = false;
  } else {
    // KONDISI 2: Nyalakan dari Awal
    audio.currentTime = 0; // Reset waktu ke 0 (awal)
    audio.play().catch((error) => {
      console.error("Gagal memutar audio:", error);
    });
    isPlaying.value = true;
  }
};

// --- 3. LOGIC THEME (Baru) ---
const isDark = ref(false);

// Fungsi Utama Mengganti Tema
const applyTheme = (darkValue) => {
  if (darkValue) {
    // Aktifkan Dark Mode
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    isDark.value = true;
  } else {
    // Matikan Dark Mode (Jadi Light Mode)
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    isDark.value = false;
  }
};

// Cek status tema saat website pertama kali dibuka
onMounted(() => {
  // Prioritas: Cek LocalStorage -> Cek Settingan Laptop/HP User
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    applyTheme(true);
  } else {
    applyTheme(false);
  }
});

// Fungsi Toggle saat tombol diklik
const toggleTheme = () => {
  applyTheme(!isDark.value);
};
</script>

<template>
  <div class="flex ml-12 max-sm:ml-4 min-md:mb-4 mt-8 gap-4 dark">
    <span class="icon" @click="toggleTheme">
      <img
        :src="isDark ? iconThemeLight : iconThemeNight"
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
