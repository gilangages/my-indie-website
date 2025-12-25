<script setup>
import { ref, onMounted, onUnmounted } from "vue";
// 1. Import dulu gambarnya satu per satu dari folder assets
// Pastikan jumlah ../ sesuai dengan kedalaman folder komponen kamu
import imgLiveScore from "../../assets/projects/live-score-counter.png";
import imgKuizia from "../../assets/projects/kuizia.png";
import imgCreative from "../../assets/projects/creative-photo-studio.png";
import imgMealio from "../../assets/projects/mealio.png";

defineProps({
  open: Boolean,
});

const emit = defineEmits(["close"]);

const isMobile = ref(false);

const checkScreen = () => {
  isMobile.value = window.innerWidth <= 600;
};

// Data Tools & Tech Stack
const tools = ["Github", "Figma", "Vs Code"];
const devStacks = ["Html/CSS", "JavaScript", "Vue.js", "React.js", "PHP"];

// Data Projects
// Catatan: Pastikan path gambar ('src') sesuai dengan struktur folder projectmu.
const projects = [
  {
    title: "Live Score Counter",
    img: imgLiveScore, // Sesuaikan path ini
    desc: "I made this website to calculate match scores between two teams. You can set the winning score, and if youfind it useful, feel free to use it.",
    link: "https://abdian.vercel.app/proyek1-creativephoto/index.html",
  },
  {
    title: "Kuizia",
    img: imgKuizia,
    desc: "I built this using Vue.js 3. This website consists of quizzes that are relevant to everyday life and can help expand your knowledge and insights. If you’re interested, you can try it out here ^_^.",
    link: "https://abdian.vercel.app/proyek8-kuizia/",
  },
  {
    title: "Creative Photo Studio",
    img: imgCreative,
    desc: "This is just a landing page for a brand. Here, I chose the brand name 'Creative Photo Studio.' It was created using only HTML/CSS and the Bootstrap framework. The website features the company profile of Creative Photo Studio.",
    link: "https://abdian.vercel.app/proyek1-creativephoto/index.html",
  },
  {
    title: "Mealio",
    img: imgMealio,
    desc: "I created this using HTML and SCSS (Sass), which was also an opportunity to learn SCSS. This website is actually quite similar to Creative Photo Studio, but the design is different. The theme here is about a fictional brand for ready-to-eat healthy food services.",
    link: "https://abdian.vercel.app/proyek5-mealio/index.html",
  },
];

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
              <button class="text-2xl transition-transform duration-200 hover:scale-110" @click="emit('close')">
                {{ isMobile ? "∨" : "[x]" }}
              </button>
            </div>

            <div class="overflow-y-auto p-4 sm:p-8 custom-scroll flex-1">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center -mt-2">
                <div class="flex flex-col gap-2">
                  <h1 class="text-xl font-bold">Tools</h1>
                  <div class="flex flex-wrap gap-2">
                    <div
                      v-for="tool in tools"
                      :key="tool"
                      class="border-2 border-black px-3 py-2 rounded shadow-[1px_3px_1px_#2c1a20] transition-transform duration-200 hover:scale-96 cursor-default bg-[#573440]">
                      {{ tool }}
                    </div>
                  </div>
                </div>

                <div class="flex flex-col gap-2">
                  <h1 class="text-xl font-bold">Development</h1>
                  <div class="flex flex-wrap gap-2">
                    <div
                      v-for="stack in devStacks"
                      :key="stack"
                      class="border-2 border-black px-3 py-2 rounded shadow-[1px_3px_1px_#2c1a20] transition-transform duration-200 hover:scale-96 cursor-default bg-[#573440]">
                      {{ stack }}
                    </div>
                  </div>
                </div>
              </div>

              <hr class="my-8 h-[3px] border-none bg-[#432832]" />

              <div id="projects" class="flex flex-col">
                <h1 class="text-2xl font-bold uppercase">My Projects</h1>

                <div v-for="(project, index) in projects" :key="index">
                  <div class="flex flex-col gap-4 items-center sm:flex-row sm:items-start sm:gap-6 py-6">
                    <div class="shrink-0">
                      <img
                        :src="project.img"
                        :alt="project.title"
                        class="w-[300px] aspect-[4/3] object-cover rounded-xl transition-transform duration-200 hover:scale-105 border border-black/10" />
                    </div>

                    <div class="flex flex-col h-full w-full">
                      <h2 class="text-[#993f4b] text-xl font-bold m-0 p-0 mb-2">
                        {{ project.title }}
                      </h2>
                      <p class="text-justify leading-relaxed mb-4">
                        {{ project.desc }}
                      </p>
                      <div class="mt-auto pt-2 sm:text-left">
                        <a
                          :href="project.link"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-block px-12 py-3 rounded-lg bg-[#794055] text-[#432832] font-semibold no-underline transition-colors hover:bg-[#8f4a63]">
                          see
                        </a>
                      </div>
                    </div>
                  </div>

                  <hr v-if="index < projects.length - 1" class="my-2 h-[3px] border-none bg-[#432832]" />
                </div>
              </div>
              <hr class="my-8 h-[3px] border-none bg-[#432832]" />
              <div id="other" class="flex flex-col">
                <h2 class="text-xl font-bold mb-4">Other dev projects:</h2>
                <ul class="list-disc list-outside pl-5">
                  <li>this website!</li>
                  <li>
                    that’s all for now, there are some projects i’m working on behind the scenes, and i’m excited to
                    share them soon (˶ᵔ ᵕ ᵔ˶).
                  </li>
                </ul>
              </div>

              <div class="mt-8 sm:text-left">
                <p>
                  See More on
                  <a
                    target="_blank"
                    href="https://github.com/gilangages"
                    class="text-[#8f4a63] hover:text-[#794055] font-bold underline">
                    Github
                  </a>
                </p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
/* Transisi & Scrollbar sama persis dengan ArtModal */

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
