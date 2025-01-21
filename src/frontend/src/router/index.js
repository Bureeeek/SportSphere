import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import CreateView from "../views/CreateView.vue";
import AccountView from "../views/AccountView.vue";
import NewsView from "../views/NewsView.vue";
import SignUpView from "@/views/SignUpView.vue";

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
    meta: { requiresAuth: true },
  },
  {
    path: "/account",
    name: "account",
    component: AccountView,
    meta: { requiresAuth: true }, // Add metadata to mark routes that need authentication
  },
  {
    path: "/news",
    name: "news",
    component: NewsView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("userToken"); // Check if token exists in localStorage

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: "signup", query: { redirect: to.fullPath } }); // Redirect to signup and include the original path
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
