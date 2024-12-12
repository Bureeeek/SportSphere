import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import CreateView from "../views/CreateView.vue";
import AccountView from "../views/AccountView.vue";
import NewsView from "../views/NewsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/create",
    name: "create",
    component: CreateView,
  },
  {
    path: "/account",
    name: "account",
    component: AccountView,
  },
  {
    path: "/news",
    name: "news",
    component: NewsView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
