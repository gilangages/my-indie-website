<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// --- 1. IMPORT GAMBAR ---
import imgJayjo from "../../assets/traditional-art/jayjo.jpeg";
import imgTotoro from "../../assets/digital-art/totoro.png";
import imgRead from "../../assets/digital-art/read.png";

defineProps({
  open: Boolean,
});

const emit = defineEmits(["close"]);

const isMobile = ref(false);
const selectedImage = ref(null);

// --- 2. DATA ARTWORKS ---
const traditionalArtworks = [
  { id: 1, src: imgJayjo, caption: "Sketch karakter Jayjo dari Webtoon Windbreaker" },
  { id: 2, src: imgJayjo, caption: "Latihan shading menggunakan pensil 2B" },
  { id: 3, src: imgJayjo, caption: "Coba menggambar anatomi wajah" },
  { id: 4, src: imgJayjo, caption: "Artstyle challenge (Traditional)" },
  { id: 5, src: imgJayjo, caption: "Fanart karakter random" },
  { id: 6, src: imgJayjo, caption: "Drawing pen practice" },
];

const digitalArtworks = [
  { id: 1, src: imgTotoro, caption: "Fanart Totoro yang gemoy (Ghibli Studio)" },
  { id: 2, src: imgRead, caption: "Original Character: Gadis yang suka membaca" },
  { id: 3, src: imgRead, caption: "Eksperimen pewarnaan style watercolor" },
];

// --- DATA ANIMATION (BARU) ---
const animationVideos = [
  { id: 1, src: "https://www.youtube.com/embed/ivdqOTAxlJo?controls=0&rel=0" },
  { id: 2, src: "https://www.youtube.com/embed/0ATh_Vc2SAQ?start=31&controls=0&rel=0" },
  { id: 3, src: "https://www.youtube.com/embed/0ATh_Vc2SAQ?start=31&controls=0&rel=0" },
];

// --- 3. LOGIKA POPUP ---
const openImage = (src, caption) => {
  selectedImage.value = { src, caption };
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
        class="fixed inset-0 z-50 bg-black/70 flex justify-center"
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
              <button class="text-2xl transition-transform duration-200 hover:scale-110" @click="emit('close')">
                {{ isMobile ? "∨" : "[x]" }}
              </button>
            </div>

            <div class="overflow-y-auto p-4 custom-scroll flex-1">
              <h1 class="uppercase text-3xl">Tools</h1>
              <div class="flex gap-4 mt-2">
                <div
                  class="border-2 border-black px-3 py-1 rounded shadow-[1px_3px_1px_#2c1a20] transition-transform duration-200 hover:scale-95">
                  Ibix Paint X
                </div>
              </div>

              <hr class="my-6 h-[3px] border-none bg-[#432832]" />

              <h1 class="uppercase text-3xl">Traditional Art</h1>
              <p class="my-2">some of my traditional art</p>

              <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 max-sm:mb-4">
                <img
                  v-for="art in traditionalArtworks"
                  :key="art.id"
                  :src="art.src"
                  class="aspect-square w-full rounded object-cover transition-transform duration-200 hover:scale-105 cursor-zoom-in"
                  @click="openImage(art.src, art.caption)" />
              </div>

              <div class="mt-2 sm:text-left">
                <p>
                  See More on
                  <a
                    target="_blank"
                    href="https://instagram.com/yourusername"
                    class="text-[#8f4a63] hover:text-[#794055] font-bold underline">
                    Instagram
                  </a>
                </p>
              </div>

              <hr class="my-8 h-[3px] border-none bg-[#432832]" />

              <h1 class="uppercase text-3xl">Digital Art</h1>
              <p class="my-2">some of my digital art</p>

              <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 max-sm:mb-4">
                <img
                  v-for="art in digitalArtworks"
                  :key="art.id"
                  :src="art.src"
                  class="aspect-square w-full rounded object-cover transition-transform duration-200 hover:scale-105 cursor-zoom-in"
                  @click="openImage(art.src, art.caption)" />
              </div>

              <div class="mt-2 sm:text-left">
                <p>
                  See More on
                  <a
                    target="_blank"
                    href="https://youtube.com/@yourchannel"
                    class="text-[#8f4a63] hover:text-[#794055] font-bold underline">
                    Youtube
                  </a>
                </p>
              </div>

              <hr class="my-8 h-[3px] border-none bg-[#432832]" />

              <h1 class="uppercase text-3xl">Animation</h1>
              <p class="my-2">some of my digital animations</p>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div
                  v-for="video in animationVideos"
                  :key="video.id"
                  class="w-full aspect-video rounded-md overflow-hidden bg-black shadow-md border border-[#432832]">
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
                  <a target="_blank" href="#" class="text-[#8f4a63] hover:text-[#794055] font-bold underline">
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
        class="fixed inset-0 z-[100] flex items-center justify-center bg-[#2c1a20]/90 backdrop-blur-sm p-4 cursor-zoom-out"
        @click="selectedImage = null">
        <button class="absolute top-5 right-5 text-white text-4xl hover:text-gray-300 z-[101]">&times;</button>

        <div class="flex flex-col items-center max-w-full max-h-[90vh]" @click.stop>
          <img
            :src="selectedImage.src"
            class="max-w-full max-h-[80vh] object-contain shadow-2xl transition-transform duration-300 scale-100 cursor-zoom-out"
            @click="selectedImage = null" />
          <p class="mt-4 text-[#e8b4b8] text-center text-lg max-w-150">
            {{ selectedImage.caption }}
          </p>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
/* STYLE SAMA (Tidak perlu ada tambahan CSS manual untuk grid video karena sudah pakai Tailwind) */
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
  transition: transform 0.25s ease, opacity 0.25s ease;
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
