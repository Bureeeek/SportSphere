import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import CreateView from "../views/CreateView.vue";
import AccountView from "../views/AccountView.vue";
import NewsView from "../views/NewsView.vue";
import NewsDetailView from "../views/NewsDetailView.vue"; // 👈 Import hinzugefügt
import SignUpView from "@/views/SignUpView.vue";
import VerificationFormView from "@/views/VerificationFormView.vue";
import AdminPanelView from "@/views/AdminPanelView.vue";

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
    meta: { requiresAuth: true },
  },
  {
    path: "/news",
    name: "news",
    component: NewsView,
  },
  {
    path: "/news/:id",
    name: "news-detail",
    component: NewsDetailView, // ✅ Richtig eingebunden
    props: true,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
  },
  {
    path: "/get-verified",
    name: "verification-form",
    component: VerificationFormView,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminPanelView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Navigation guard für geschützte Routen
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("userToken");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: "signup", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
