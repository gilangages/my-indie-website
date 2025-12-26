<script setup>
import { ref, onMounted, onUnmounted } from "vue";
// 1. Import Component Icon & Modal
import IconEmail from "../../assets/svg/email.svg?component";
import ContactModal from "../Modal/ContactModal.vue";
import clickSfxFile from "../../assets/audio/click-main.mp3"; // <-- (1) Import Audio

// 2. Setup Audio
const clickAudio = new Audio(clickSfxFile);
clickAudio.volume = 0.1;

const playClickSound = () => {
  clickAudio.currentTime = 0;
  clickAudio.play().catch((e) => console.error(e));
};

// 3. State untuk Modal Contact
const showContactModal = ref(false);

// Fungsi wrapper untuk Icon Email (Bunyi + Buka Modal)
const openContact = () => {
  playClickSound();
  showContactModal.value = true;
};

// Optional: Tekan ESC untuk menutup modal (UX yang baik)
const onKeydown = (e) => {
  if (e.key === "Escape") {
    showContactModal.value = false;
  }
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <div class="flex">
    <div class="text-center translate-x-10 mb-2 relative max-sm:translate-x-14">
      <img src="../../assets/others/banner-dark-crop-removebg.png" alt="" class="mx-auto w-[31%] max-sm:w-[90%]" />
    </div>

    <div class="relative -translate-x-2 translate-y-4 max-sm:translate-x-6">
      <IconEmail
        @click="openContact"
        class="transition-transform duration-200 max-sm:w-24 w-12 hover:scale-115 hover:text-[#573440] text-[#993F4B] cursor-pointer" />
    </div>
  </div>

  <div class="grid grid-cols-3 gap-4 mt-[-1.5em] mb-4 justify-center items-center pt-4 max-sm:grid-cols-3">
    <router-link to="/" exact-active-class="underline underline-offset-4 decoration-[#a95964]" @click="playClickSound">
      <div
        class="text-center text-[24px] max-sm:text-[20px] border-[1.5px] border-[#573440] rounded-xl text-[#a95964] px-8 max-sm:px-2 max-sm:py-1 transition-transform duration-200 hover:scale-105 hover:bg-bg-hover cursor-pointer">
        About
      </div>
    </router-link>

    <router-link
      to="/interests"
      exact-active-class="underline underline-offset-4 decoration-[#a95964]"
      @click="playClickSound">
      <div
        class="text-center text-[24px] max-sm:text-[20px] border-[1.5px] border-[#573440] rounded-xl text-[#a95964] px-8 max-sm:px-2 max-sm:py-1 transition-transform duration-200 hover:scale-105 hover:bg-bg-hover cursor-pointer">
        Interests
      </div>
    </router-link>

    <router-link to="/find-me" active-class="underline underline-offset-4 decoration-[#a95964]" @click="playClickSound">
      <div
        class="text-center text-[24px] max-sm:text-[20px] border-[1.5px] border-[#573440] rounded-xl text-[#a95964] px-8 max-sm:px-2 max-sm:py-1 transition-transform duration-200 hover:scale-105 hover:bg-bg-hover cursor-pointer">
        Find Me
      </div>
    </router-link>
  </div>

  <ContactModal :open="showContactModal" @close="showContactModal = false" />
</template>

<style></style>
