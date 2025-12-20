<script setup>
// belum ada logic JS, tema dikontrol global melalui class 'dark' di <html>
</script>

<template>
  <!-- BANNER -->
  <div class="text-center ml-4">
    <img src="../../assets/banner-dark-crop.png" alt="" class="mx-auto w-[30%] max-sm:w-[70%]" />
  </div>

  <!-- NAVBARS -->
  <div class="grid grid-cols-3 gap-4 mt-[-1.5em] justify-center items-center pt-4 max-sm:grid-cols-3">
    <!-- Item Navbar -->
    <router-link to="/" exact-active-class="underline underline-offset-4 decoration-[#a95964]">
      <div
        class="text-center text-[24px] max-sm:text-[16px] border-[1.5px] border-[#573440] rounded-xl text-[#a95964] px-8 max-sm:px-2 max-sm:py-1 transition-transform duration-200 hover:scale-105 hover:bg-[#121212] cursor-pointer">
        About
      </div>
    </router-link>
    <router-link to="/interests" exact-active-class="underline underline-offset-4 decoration-[#a95964]">
      <div
        class="text-center text-[24px] max-sm:text-[16px] border-[1.5px] border-[#573440] rounded-xl text-[#a95964] px-8 max-sm:px-2 max-sm:py-1 transition-transform duration-200 hover:scale-105 hover:bg-[#121212] cursor-pointer">
        Interests
      </div>
    </router-link>

    <router-link to="/find-me" active-class="underline underline-offset-4 decoration-[#a95964]">
      <div
        class="text-center text-[24px] max-sm:text-[16px] border-[1.5px] border-[#573440] rounded-xl text-[#a95964] px-8 max-sm:px-2 max-sm:py-1 transition-transform duration-200 hover:scale-105 hover:bg-[#121212] cursor-pointer">
        Find Me
      </div>
    </router-link>
  </div>
</template>

<style>
body {
  font-family: Capriola, sans-serif;
  background-color: #000;
}
</style>
