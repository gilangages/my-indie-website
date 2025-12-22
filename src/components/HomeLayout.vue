<script setup>
import Footer from "./Sections/Footer.vue";
import Icon from "./Sections/Icon.vue";
import Navbar from "./Sections/Navbar.vue";
</script>
<template>
  <Icon />

  <div class="w-full flex justify-center">
    <div class="w-full max-w-175 sm:border-4 sm:border-[#573440] sm:rounded-[30px] px-3">
      <Navbar />
      <RouterView />
      <Footer />
    </div>
  </div>
</template>

<style>
body {
  font-family: Capriola, sans-serif;
  background-color: #000;
}
</style>
