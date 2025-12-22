<script setup>
// belum ada logic JS
</script>

<template>
  <div class="grid grid-cols-1 gap-2 text-[#993f4b]">
    <!-- YOUTUBE -->
    <div
      class="border border-[#a95964] rounded-[10px] px-2 pt-2 mx-2 mt-4 transition-transform duration-200 hover:scale-101">
      <!-- header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-base max-sm:text-sm">
          <img src="../../assets/yt.svg" alt="YouTube" class="w-8 max-sm:w-6" />
          <span>YouTube</span>
        </div>

        <a href="#" class="text-[12px] text-[#993f4b] no-underline">
          <div
            class="px-6 py-1 border border-[#a95964] rounded transition-transform duration-200 hover:scale-105 hover:bg-[#1d1d1d]">
            View
          </div>
        </a>
      </div>

      <!-- description -->
      <p class="my-2 text-[12px] text-[#573440]">
        I’m mostly active on YouTube, where I draw digitally, build websites, and do whatever I enjoy.
      </p>
    </div>

    <!-- INSTAGRAM -->
    <div
      class="border border-[#a95964] rounded-[10px] px-2 pt-2 mx-2 mt-2 transition-transform duration-200 hover:scale-101">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-base max-sm:text-sm">
          <img src="../../assets/instagram.svg" alt="Instagram" class="w-8 max-sm:w-6" />
          <span>Instagram</span>
        </div>

        <a href="#" class="text-[12px] text-[#993f4b] no-underline">
          <div
            class="px-6 py-1 border border-[#a95964] rounded transition-transform duration-200 hover:scale-105 hover:bg-[#1d1d1d]">
            View
          </div>
        </a>
      </div>

      <p class="my-2 text-[12px] text-[#573440]">
        I share my traditional art here. If you’re curious about my drawings, feel free to check them out.
      </p>
    </div>

    <!-- TIKTOK -->
    <div
      class="border border-[#a95964] rounded-[10px] px-2 pt-2 mx-2 mt-2 mb-8 transition-transform duration-200 hover:scale-101">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-base max-sm:text-sm">
          <img src="../../assets/tiktok.svg" alt="TikTok" class="w-8 max-sm:w-6" />
          <span>TikTok</span>
        </div>

        <a href="#" class="text-[12px] text-[#993f4b] no-underline">
          <div
            class="px-6 py-1 border border-[#a95964] rounded transition-transform duration-200 hover:scale-105 hover:bg-[#1d1d1d]">
            View
          </div>
        </a>
      </div>

      <p class="my-2 text-[12px] text-[#573440]">
        I’m not very active on TikTok, but I still use it to share my traditional art.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* semua styling via Tailwind */
</style>
