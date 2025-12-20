import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import { createRouter, createWebHistory } from "vue-router";
import HomeLayout from "./components/HomeLayout.vue";
import About from "./components/Pages/About.vue";
import FindMe from "./components/Pages/FindMe.vue";
import Interests from "./components/Pages/Interests.vue";
import ArtModal from "./components/Modal/ArtModal.vue";

const router = createRouter({
  routes: [
    {
      path: "/",
      component: HomeLayout,
      children: [
        {
          path: "",
          component: About,
        },
        {
          path: "find-me",
          component: FindMe,
        },
        {
          path: "interests",
          component: Interests,
        },
      ],
    },
    {
      path: "/see-art",
      component: ArtModal,
    },
  ],
  history: createWebHistory(),
});
createApp(App).use(router).mount("#app");
