<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// --- 1. IMPORT GAMBAR ---
import imgJayjo from "../../assets/traditional-art/jayjo.jpeg";
import haise from "../../assets/traditional-art/one.jpeg";
import yuta from "../../assets/traditional-art/two.jpeg";
import imgTotoro from "../../assets/digital-art/totoro.png";
import imgRead from "../../assets/digital-art/read.png";
import imgHehe from "../../assets/digital-art/hehe.png";

// --- IMPORT AUDIO ---
import clickSupportSrc from "../../assets/audio/click-support.mp3"; // Untuk hover Ibix
import clickMainSrc from "../../assets/audio/click-main.mp3"; // Untuk tombol Close Modal Utama
import popMainSrc from "../../assets/audio/pop-main.mp3"; // NEW: Untuk Buka Gambar (pop-main)
import popSupportSrc from "../../assets/audio/pop-support.mp3"; // NEW: Untuk Tutup Gambar (pop-support)

defineProps({
  open: Boolean,
});

const emit = defineEmits(["close"]);

const isMobile = ref(false);
const selectedImage = ref(null);

// --- 2. DATA ARTWORKS ---
const traditionalArtworks = [
  { id: 1, src: imgJayjo, caption: "Jayjo from Webtoon Windbreaker" },
  { id: 2, src: haise, caption: "Ken Kaneki and Touka from manga Tokyo Ghoul" },
  { id: 2, src: yuta, caption: "Yuta Okkotsu from manga Jujutsu Kaisen" },
];

const digitalArtworks = [
  { id: 1, src: imgTotoro, caption: "Fanart Totoro (Ghibli Studio), reference from pinterest" },
  { id: 2, src: imgRead, caption: "My first draw in ibis paint x" },
  { id: 3, src: imgHehe, caption: "Girl and Boy, reference from pinterest" },
];

const animationVideos = [
  { id: 1, src: "https://www.youtube.com/embed/YgLzyukIxjs?si=hnX-5HtpK6aX_t5x" },
  { id: 2, src: "https://www.youtube.com/embed/C8tw3iHPsc4?si=XyryWRQnyryIl0u0" },
];

// --- 3. LOGIKA POPUP & AUDIO ---
let howlerModule = null;
let hoverAudio = null;
let clickAudio = null;
let popMainAudio = null;
let popSupportAudio = null;

// Fungsi suara HOVER (Ibix Paint X)
const playHoverSound = async () => {
  if (!howlerModule) howlerModule = await import("howler");
  if (!hoverAudio) hoverAudio = new howlerModule.Howl({ src: [clickSupportSrc], volume: 0.1 });
  hoverAudio.stop();
  hoverAudio.play();
};

// Fungsi suara KLIK (Tombol Close Modal Utama)
const playClickSound = async () => {
  if (!howlerModule) howlerModule = await import("howler");
  if (!clickAudio) clickAudio = new howlerModule.Howl({ src: [clickMainSrc], volume: 0.1 });
  clickAudio.stop();
  clickAudio.play();
};

// Wrapper untuk tombol close modal utama
const handleClose = () => {
  playClickSound();
  emit("close");
};

// --- LOGIKA BUKA/TUTUP GAMBAR PREVIEW ---

// 1. Buka Gambar (Bunyi pop-main.mp3)
const openImage = async (src, caption) => {
  if (!howlerModule) howlerModule = await import("howler");
  if (!popMainAudio) popMainAudio = new howlerModule.Howl({ src: [popMainSrc], volume: 0.1 });
  popMainAudio.stop();
  popMainAudio.play();

  selectedImage.value = { src, caption };
};

// 2. Tutup Gambar (Bunyi pop-support.mp3)
const closeImage = async () => {
  if (selectedImage.value) {
    if (!howlerModule) howlerModule = await import("howler");
    if (!popSupportAudio) popSupportAudio = new howlerModule.Howl({ src: [popSupportSrc], volume: 0.1 });
    popSupportAudio.stop();
    popSupportAudio.play();

    selectedImage.value = null;
  }
};

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
        class="fixed inset-0 z-50 flex justify-center pointer-events-none"
        :class="isMobile ? 'items-end' : 'items-center'">
        <transition :name="isMobile ? 'sheet' : 'scale'">
          <div
            v-show="open"
            :class="
              isMobile
                ? 'font-display fixed bottom-0 left-0 right-0 max-h-[90vh] min-h-[60vh] rounded-t-[20px] bg-bg-modal text-text-modal overflow-hidden flex flex-col pointer-events-auto shadow-[0_-5px_30px_rgba(0,0,0,0.3)] transition-colors duration-300'
                : 'font-display absolute inset-0 m-auto w-[90%] max-w-[960px] max-h-[85vh] rounded-[20px] bg-bg-modal text-text-modal  overflow-hidden flex flex-col pointer-events-auto shadow-2xl border-2 border-black/10 transition-colors duration-300'
            ">
            <div
              class="sticky top-0 z-10 flex justify-between items-center p-3 border-b border-black/20 bg-bg-modal text-accent transition-colors duration-300">
              <p>art</p>
              <button
                class="cursor-pointer text-2xl transition-transform duration-200 hover:scale-110 pr-3"
                @click="handleClose">
                {{ isMobile ? "∨" : "[x]" }}
              </button>
            </div>

            <div class="overflow-y-auto p-4 custom-scroll flex-1">
              <h1 class="uppercase text-3xl">Tools</h1>
              <div class="flex gap-4 mt-2">
                <div
                  @mouseenter="playHoverSound"
                  class="border-2 px-3 py-1 rounded shadow-[1px_3px_1px_#2c1a20] transition-transform duration-200 hover:scale-95 cursor-default">
                  Ibix Paint X
                </div>
              </div>

              <hr class="my-6 h-[3px] border-none bg-black/10" />

              <h1 class="uppercase text-3xl">Traditional Art</h1>
              <p class="my-2">some of my traditional art</p>

              <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 max-sm:mb-4">
                <img
                  v-for="art in traditionalArtworks"
                  :key="art.id"
                  :src="art.src"
                  class="aspect-square w-full rounded object-cover transition-transform duration-200 hover:scale-105 cursor-zoom-in border border-black/10"
                  @click="openImage(art.src, art.caption)" />
              </div>

              <div class="mt-2 sm:text-left">
                <p>
                  See More on
                  <a
                    target="_blank"
                    href="https://www.instagram.com/qeynotfound"
                    class="text-accent hover:opacity-80 font-bold underline">
                    Instagram
                  </a>
                </p>
              </div>

              <hr class="my-8 h-[3px] border-none bg-black/10" />

              <h1 class="uppercase text-3xl">Digital Art</h1>
              <p class="my-2">some of my digital art</p>

              <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 max-sm:mb-4">
                <img
                  v-for="art in digitalArtworks"
                  :key="art.id"
                  :src="art.src"
                  class="aspect-square w-full rounded object-cover transition-transform duration-200 hover:scale-105 cursor-zoom-in border border-black/10"
                  @click="openImage(art.src, art.caption)" />
              </div>

              <div class="mt-2 sm:text-left">
                <p>
                  See More on
                  <a
                    target="_blank"
                    href="https://www.youtube.com/@jeezfay"
                    class="text-accent hover:opacity-80 font-bold underline">
                    Youtube
                  </a>
                </p>
              </div>

              <hr class="my-8 h-[3px] border-none bg-black/10" />

              <h1 class="uppercase text-3xl">Animation</h1>
              <p class="my-2">some of my digital animations</p>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div
                  v-for="video in animationVideos"
                  :key="video.id"
                  class="w-full aspect-video rounded-md overflow-hidden bg-black shadow-md border border-black/10">
                  <iframe
                    :src="video.src"
                    class="w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
                </div>
              </div>

              <div class="mt-2 max-sm:my-4 sm:text-left">
                <p>
                  See More on
                  <a
                    target="_blank"
                    href="https://www.youtube.com/@jeezfay"
                    class="text-accent hover:opacity-80 font-bold underline">
                    Youtube
                  </a>
                </p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <transition name="fade">
      <div
        v-if="selectedImage"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-bg-preview/90 backdrop-blur-sm p-4 cursor-zoom-out pointer-events-auto transition-colors duration-300"
        @click="closeImage">
        <button
          @click="closeImage"
          class="absolute top-5 right-5 text-white text-4xl hover:text-gray-300 z-[101] cursor-pointer">
          &times;
        </button>

        <div class="flex flex-col items-center max-w-full max-h-[90vh]" @click.stop>
          <img
            :src="selectedImage.src"
            class="max-w-full max-h-[80vh] object-contain shadow-2xl transition-transform duration-300 scale-100 cursor-zoom-out"
            @click="closeImage" />
          <p class="mt-4 text-text-preview text-center text-lg max-w-150 font-bold">
            {{ selectedImage.caption }}
          </p>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
/* CSS TRANSISI DAN SCROLLBAR - TIDAK DIUBAH */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

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

.custom-scroll::-webkit-scrollbar {
  width: 8px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: var(--color-accent);
  border-radius: 10px;
}

.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: var(--color-accent) transparent;
}
</style>
