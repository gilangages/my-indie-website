<template>
  <div class="min-h-screen bg-black flex items-center justify-center font-sans p-4">
    <div class="w-full max-w-200 relative">
      <div class="flex gap-4 mb-4 ml-8">
        <span class="text-[#4a2a2a] text-3xl"><img src="../../assets/theme-on.svg" width="40px" alt="" /></span>
        <span class="text-[#4a2a2a] text-3xl"><img src="../../assets/music-on.svg" width="40px" alt="" /></span>
      </div>

      <div class="border-4 border-[#4a2a2a] rounded-[40px] p-8 pb-0 overflow-hidden relative">
        <div class="flex justify-center mb-6">
          <div class="relative">
            <img src="../../assets/banner-black2.png" alt="Sleeping character" class="h-64 -mb-4" />
            <!-- <span class="absolute -right-8 top-0 text-[#4a2a2a] font-bold text-xl tracking-widest">zzz</span> -->
          </div>
        </div>

        <div class="flex justify-center gap-4 mb-10">
          <button
            class="px-12 py-1 border border-[#4a2a2a] rounded-full text-[#a85555] hover:bg-[#4a2a2a]/20 transition">
            About
          </button>
          <button
            class="px-12 py-1 border border-[#4a2a2a] rounded-full text-[#a85555] hover:bg-[#4a2a2a]/20 transition">
            Interests
          </button>
          <button
            class="px-12 py-1 border border-[#4a2a2a] rounded-full text-[#a85555] hover:bg-[#4a2a2a]/20 transition">
            Find Me
          </button>
        </div>

        <div class="flex items-end gap-8 px-4">
          <div class="shrink-0">
            <img src="../../assets/me-black.png" alt="Character standing" class="h-84 object-contain" />
          </div>

          <div class="pb-16">
            <h1 class="text-6xl font-medium text-[#a85555] mb-6 tracking-wide">About Me</h1>
            <div class="text-[#a85555] text-xl leading-relaxed max-w-md space-y-2">
              <p>
                My name is
                <span class="font-semibold">Abdian</span>
                . I'm
              </p>
              <p>currently studying in university.</p>
              <p>If I have free time I use to</p>
              <p>draw and make animation.</p>
            </div>
          </div>
        </div>

        <div class="border-t-2 border-[#4a2a2a] py-2 mt-4 text-center">
          <p class="text-[#a85555] text-sm tracking-widest">@ 2025 Abdian</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCard",
  data() {
    return {
      // Kamu bisa menyimpan data teks di sini jika ingin dinamis
    };
  },
};
</script>

<style scoped>
/* Custom font jika ingin lebih mirip (opsional) */
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");

div {
  font-family: "Varela Round", sans-serif;
}

/* Mengatur scrollbar atau efek noise tipis jika perlu */
</style>
