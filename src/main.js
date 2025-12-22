import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import { createRouter, createWebHistory } from "vue-router";
import HomeLayout from "./components/HomeLayout.vue";
import About from "./components/Pages/About.vue";
import FindMe from "./components/Pages/FindMe.vue";
import Interests from "./components/Pages/Interests.vue";

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
  ],
  history: createWebHistory(),
});
createApp(App).use(router).mount("#app");
