<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// --- 1. IMPORT GAMBAR ---
// Pastikan path ini benar sesuai struktur foldermu
import imgEscape from "../../assets/games/escape-from-the-house.png";

defineProps({
  open: Boolean,
});

const emit = defineEmits(["close"]);

const isMobile = ref(false);

// --- 2. DATA ---
const tools = ["Unity"];

const games = [
  {
    id: 1,
    title: "Escape From the House: Horror Game",
    img: imgEscape,
    // Karena ada link di tengah kalimat, kita pakai HTML string
    desc: `This is a horror game where you have to escape from a house. But of course, it’s not that easy — you need to find a key hidden somewhere inside first. I made this game for a college assignment. Honestly, I’m not even sure why I chose the horror genre. At that time, I just thought, “horror games are fun,” so I decided to make one. This game was made independently using various references I found on the internet. I uploaded this game for free on <a href="https://itch.io/" target="_blank" rel="noopener noreferrer" class="text-[#8f4a63] hover:text-[#794055] font-bold underline">itch.io</a>. If you’re interested in trying it out, you can download it for free.`,
    downloadLink: "https://qbdian.itch.io/escape-from-room",
  },
];

const checkScreen = () => {
  isMobile.value = window.innerWidth <= 600;
};

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreen);
});
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-show="open"
        class="fixed inset-0 z-50 bg-black/70 flex justify-center font-['Capriola',_sans-serif]"
        :class="isMobile ? 'items-end' : 'items-center'"
        @click.self="emit('close')">
        <transition :name="isMobile ? 'sheet' : 'scale'">
          <div
            v-show="open"
            :class="
              isMobile
                ? 'fixed bottom-0 left-0 right-0 max-h-[90vh] min-h-[60vh] rounded-t-[20px] bg-[#573440] text-black overflow-hidden flex flex-col'
                : 'absolute inset-0 m-auto w-[90%] max-w-[960px] max-h-[85vh] rounded-[20px] bg-[#573440] text-black overflow-hidden flex flex-col'
            ">
            <div class="sticky top-0 z-10 flex justify-end p-3 bg-[#573440] border-b border-black/20">
              <button
                class="text-2xl transition-transform duration-200 hover:scale-110 bg-transparent border-none cursor-pointer"
                @click="emit('close')">
                {{ isMobile ? "∨" : "[x]" }}
              </button>
            </div>

            <div class="overflow-y-auto p-4 sm:p-6 custom-scroll flex-1">
              <div id="info">
                <h1 class="uppercase text-2xl font-bold mb-2">Tools</h1>
                <div class="flex gap-4">
                  <div
                    v-for="tool in tools"
                    :key="tool"
                    class="border-2 border-black px-3 py-1 rounded shadow-[1px_3px_1px_#2c1a20] transition-transform duration-200 hover:scale-95 bg-[#573440]">
                    {{ tool }}
                  </div>
                </div>
              </div>

              <hr class="my-6 h-[3px] border-none bg-[#432832]" />

              <div id="games-wrapper">
                <h1 class="uppercase text-2xl font-bold">3d Game</h1>
                <p class="my-2 text-sm sm:text-base">some of my game</p>

                <div v-for="game in games" :key="game.id" class="mt-6">
                  <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
                    <div class="shrink-0">
                      <img
                        :src="game.img"
                        :alt="game.title"
                        class="w-[330px] sm:w-[380px] aspect-[4/3] object-cover rounded-lg transition-transform duration-200 hover:scale-105 border border-black/10" />
                    </div>

                    <div class="flex flex-col w-full text-center sm:text-left">
                      <h1 class="text-[#993f4b] text-xl font-bold mb-2">
                        {{ game.title }}
                      </h1>

                      <p class="text-justify leading-relaxed mb-6 text-sm sm:text-base" v-html="game.desc"></p>

                      <div class="mt-auto flex justify-center sm:justify-start">
                        <a
                          :href="game.downloadLink"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-block px-8 py-3 rounded-lg bg-[#794055] text-[#432832] font-semibold no-underline transition-colors hover:bg-[#8f4a63]">
                          download
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr class="my-8 h-[3px] border-none bg-[#432832]" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
/* Transisi dan Scrollbar persis seperti ArtModal/WebModal */

/* fade overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* desktop scale */
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

/* mobile bottom sheet */
.sheet-enter-active {
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.sheet-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 1, 1);
}
.sheet-enter-from {
  transform: translateY(100%);
}
.sheet-enter-to {
  transform: translateY(0);
}
.sheet-leave-from {
  transform: translateY(0);
}
.sheet-leave-to {
  transform: translateY(100%);
}

/* custom scrollbar */
.custom-scroll::-webkit-scrollbar {
  width: 8px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: #432832;
  border-radius: 10px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #8f4a63;
  border-radius: 10px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #a65772;
}
.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: #8f4a63 #432832;
}
</style>
