<script setup>
import { ref, onMounted, onUnmounted } from "vue";
// 1. Import gambar
import imgLiveScore from "../../assets/projects/live-score-counter.png";
import imgKuizia from "../../assets/projects/kuizia.png";
import imgCreative from "../../assets/projects/creative-photo-studio.png";
import imgMealio from "../../assets/projects/mealio.png";

// --- IMPORT AUDIO ---
import clickSupportMp3 from "../../assets/audio/click-support.mp3";
import clickMainMp3 from "../../assets/audio/click-main.mp3";

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
const projects = [
  {
    title: "Live Score Counter",
    img: imgLiveScore,
    desc: "I made this website to calculate match scores between two teams. You can set the winning score, and if you find it useful, feel free to use it.",
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

// --- AUDIO LOGIC ---
const playHoverSound = () => {
  const audio = new Audio(clickSupportMp3);
  audio.volume = 0.1;
  audio.play();
};

const handleClose = () => {
  const audio = new Audio(clickMainMp3);
  audio.volume = 0.1;
  audio.play();
  emit("close");
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
                ? 'fixed bottom-0 left-0 right-0 max-h-[90vh] min-h-[60vh] rounded-t-[20px] bg-bg-modal text-text-modal overflow-hidden flex flex-col pointer-events-auto shadow-[0_-5px_30px_rgba(0,0,0,0.3)] transition-colors duration-300'
                : 'absolute inset-0 m-auto w-[90%] max-w-[960px] max-h-[85vh] rounded-[20px] bg-bg-modal text-text-modal overflow-hidden flex flex-col pointer-events-auto shadow-2xl border-2 border-black/10 transition-colors duration-300'
            ">
            <div
              class="sticky top-0 z-10 flex justify-end p-3 text-text-modal border-b border-black/20 bg-bg-modal transition-colors duration-300">
              <button
                class="cursor-pointer text-2xl transition-transform duration-200 hover:scale-110"
                @click="handleClose">
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
                      @mouseenter="playHoverSound"
                      class="border-2 px-3 py-2 rounded shadow-[1px_3px_1px_#2c1a20] transition-transform duration-200 hover:scale-95 cursor-default">
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
                      @mouseenter="playHoverSound"
                      class="border-2 px-3 py-2 rounded shadow-[1px_3px_1px_#2c1a20] transition-transform duration-200 hover:scale-95 cursor-default">
                      {{ stack }}
                    </div>
                  </div>
                </div>
              </div>

              <hr class="my-8 h-[3px] border-none bg-black/10" />

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
                      <h2 class="text-accent text-xl font-bold m-0 p-0 mb-2">
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
                          class="inline-block px-12 py-3 rounded-lg bg-accent text-white font-semibold no-underline transition-opacity hover:opacity-80">
                          see
                        </a>
                      </div>
                    </div>
                  </div>

                  <hr v-if="index < projects.length - 1" class="my-2 h-[3px] border-none bg-black/10" />
                </div>
              </div>

              <hr class="my-8 h-[3px] border-none bg-black/10" />

              <div id="other" class="flex flex-col">
                <h2 class="text-xl font-bold mb-4">Other dev projects:</h2>
                <ul class="list-disc list-outside pl-5">
                  <li>this website!</li>
                  <li>
                    that’s all for now, there are some projects i’m working on behind the scenes and i’m excited to
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
                    class="text-accent hover:opacity-80 font-bold underline">
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
/* Transisi Overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Transisi Desktop Scale */
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

/* Transisi Mobile Sheet */
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

/* Custom Scrollbar (Dinamis mengikuti Warna Aksen) */
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
