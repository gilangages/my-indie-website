<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import bannerImg from "../../assets/others/me-email-crop-removebg.png";
import clickSfxFile from "../../assets/audio/click-main.mp3"; // <-- (1) Import Audio

defineProps({
  open: Boolean,
});

const emit = defineEmits(["close"]);

const isMobile = ref(false);
const emailText = "qbdian@gmail.com";
const copyTooltip = ref("Copy to clipboard");

// --- (2) SETUP AUDIO ---
const clickAudio = new Audio(clickSfxFile);
clickAudio.volume = 0.1;

// Fungsi handle close (Bunyi dulu, baru emit close)
const handleClose = () => {
  clickAudio.currentTime = 0;
  clickAudio.play().catch((e) => console.error(e));
  emit("close");
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(emailText);
  copyTooltip.value = "Copied!";
  setTimeout(() => {
    copyTooltip.value = "Copy to clipboard";
  }, 1200);
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
                ? 'fixed bottom-0 left-0 right-0 h-[85vh] rounded-t-[20px] bg-bg-modal text-text-modal overflow-hidden flex flex-col pointer-events-auto shadow-[0_-5px_30px_rgba(0,0,0,0.3)] transition-colors duration-300'
                : 'relative w-auto min-w-[400px] max-w-[1000px] h-fit max-h-[95vh] rounded-[20px] bg-bg-modal text-text-modal overflow-hidden flex flex-col shadow-2xl pointer-events-auto  transition-colors duration-300 border-2 border-black/10'
            ">
            <div class="flex justify-end p-3 sm:p-4 z-20 relative transition-colors duration-300">
              <button
                class="text-2xl transition-transform duration-200 hover:scale-115 cursor-pointer bg-transparent border-none"
                @click="handleClose">
                {{ isMobile ? "∨" : "[x]" }}
              </button>
            </div>

            <hr class="mb-2 -mt-1 h-[3px] border-none bg-[#432832]" />

            <div
              class="px-4 custom-scroll flex flex-col items-center text-center w-full"
              :class="isMobile ? 'overflow-y-auto pb-8 h-full' : 'overflow-hidden pb-10'">
              <div class="mb-2 z-10 relative">
                <h1 class="text-3xl font-bold mb-2">contact me</h1>
                <p class="text-sm sm:text-base leading-relaxed max-w-md mx-auto py-0 px-0">
                  if you want to chat, share something, or just ask a question, feel free to email me.
                </p>
              </div>

              <div class="flex justify-center w-full relative z-0">
                <img
                  :src="bannerImg"
                  alt="Banner"
                  class="relative object-contain transition-all duration-300"
                  :class="
                    isMobile ? 'w-[100px] -mt-8 translate-y-4' : 'w-full max-w-[600px] max-h-[50vh] -translate-y-4'
                  " />
              </div>

              <div class="flex flex-col items-center relative z-10" :class="isMobile ? 'mt-3' : '-mt-5'">
                <p class="text-sm sm:text-base font-medium px-0 py-0">
                  you can email me at
                  <br class="sm:hidden" />

                  <span
                    class="group relative cursor-pointer text-[#8f4a63] font-bold transition-colors hover:text-[#794055] inline-block sm:mt-0 ml-1"
                    @click="copyToClipboard">
                    {{ emailText }}

                    <span
                      class="absolute bottom-[120%] left-1/2 -translate-x-1/2 bg-[#111] text-[#8f4a63] text-xs px-2 py-1 rounded-md whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none group-hover:opacity-100">
                      {{ copyTooltip }}
                    </span>
                  </span>
                </p>

                <p class="text-sm sm:text-base">or click the button bellow to open your email app.</p>

                <div class="mt-4">
                  <a
                    :href="`mailto:${emailText}`"
                    class="inline-block bg-[#794055] text-[#432832] px-6 py-3 rounded-lg text-base no-underline transition-colors hover:bg-[#8f4a63] cursor-pointer shadow-lg">
                    send me an email!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
/* CSS BAWAAN TETAP AMAN */
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
