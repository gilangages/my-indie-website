<script setup>
// 1. IMPORT ASSETS GAMBAR
import iconIg from "../../assets/svg/instagram.svg?url";
import { Icon } from "@iconify/vue";
import clickSfxFile from "../../assets/audio/click-main.mp3"; // <-- (1) Import Audio

// 2. SETUP AUDIO
let howlerModule = null;
let clickAudio = null;

const playClickSound = async () => {
  if (!howlerModule) howlerModule = await import("howler");
  if (!clickAudio) {
    clickAudio = new howlerModule.Howl({ src: [clickSfxFile], volume: 0.1 });
  }
  clickAudio.stop();
  clickAudio.play();
};

// 3. DATA SOCIAL MEDIA
const socials = [
  // {
  //   id: 1,
  //   name: "YouTube",
  //   icon: iconYt,
  //   link: "https://www.youtube.com/@gilangabdian",
  //   desc: "I’m mostly active on YouTube, where I draw digitally, build websites, and do whatever I enjoy.",
  // },
  {
    id: 1,
    name: "Instagram",
    icon: "simple-icons:instagram",
    link: "https://www.instagram.com/qeynotfound",
    desc: "I share my traditional art here. If you’re curious about my drawings, feel free to check them out.",
  },
  {
    id: 2,
    name: "Github",
    icon: "simple-icons:github",
    link: "https://github.com/gilangages",
    desc: "Just a place where I store my projects.",
  },
];
</script>

<template>
  <div class="grid grid-cols-1 gap-4 text-[#993f4b] mx-2 mt-4 mb-7">
    <div v-for="social in socials" :key="social.id"
      class="border border-[#a95964] rounded-[10px] px-2 pt-2 transition-transform duration-200 hover:scale-101">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-base max-sm:text-sm">
          <Icon :icon="social.icon" :alt="social.name" class="text-2xl" />
          <span>{{ social.name }}</span>
        </div>

        <a :href="social.link" target="_blank" rel="noopener noreferrer" class="text-[12px] text-[#993f4b] no-underline"
          @click="playClickSound">
          <div
            class="px-6 py-1 border border-[#a95964] rounded transition-transform duration-200 hover:scale-105 hover:bg-bg-hover">
            View
          </div>
        </a>
      </div>

      <p class="my-2 text-[12px] text-[#573440]">
        {{ social.desc }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Styling via Tailwind */
</style>