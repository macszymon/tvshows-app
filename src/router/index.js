import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Shows from "@/pages/Shows.vue";
import NotFound from "@/pages/NotFound.vue";
import Show from "@/pages/Show.vue";
import Search from "@/pages/Search.vue";
import Person from "@/pages/Person.vue";
import Schedule from "@/pages/Schedule.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/shows",
      name: "shows",
      component: Shows,
    },
    {
      path: "/schedule",
      name: "schedule",
      component: Schedule,
    },
    {
      path: "/shows/:id",
      name: "show",
      component: Show,
    },
    {
      path: "/people/:id",
      name: "person",
      component: Person,
    },
    {
      path: "/search/:type/:query",
      name: "search",
      component: Search,
    },
    {
      path: "/:catchAll(.*)",
      name: "notFound",
      component: NotFound,
    },
  ],
});

export default router;
