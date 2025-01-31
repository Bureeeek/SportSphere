<template>
  <div :class="['app-container', theme]">
    <!-- Sidebar -->
    <nav class="sidebar">
      <!-- Logo -->
      <div class="logo-container">
        <img :src="logoSrc" alt="Logo" class="logo" />
      </div>
      <ul>
        <li>
          <router-link to="/#">
            <NewspaperIcon class="icon" />
            <span class="link-text">News</span>
          </router-link>
        </li>
        <li>
          <router-link to="/create">
            <PencilIcon class="icon" />
            <span class="link-text">Create</span>
          </router-link>
        </li>
        <li>
          <router-link to="/about">
            <InformationIcon class="icon" />
            <span class="link-text">About</span>
          </router-link>
        </li>
        <li>
          <router-link to="/account">
            <AccountIcon class="icon" />
            <span class="link-text">Account</span>
          </router-link>
        </li>
      </ul>
      <button @click="toggleTheme" class="toggle-btn">
        <ThemeLightDarkIcon class="icon" />
        <span class="link-text">
          {{ theme === 'dark-mode' ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
        </span>
      </button>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { provide, reactive, computed } from "vue";
import AccountIcon from "vue-material-design-icons/Account.vue";
import NewspaperIcon from "vue-material-design-icons/Newspaper.vue";
import PencilIcon from "vue-material-design-icons/Pencil.vue";
import InformationIcon from "vue-material-design-icons/Information.vue";
import ThemeLightDarkIcon from "vue-material-design-icons/ThemeLightDark.vue";

export default {
  name: "App",
  components: {
    AccountIcon,
    NewspaperIcon,
    PencilIcon,
    InformationIcon,
    ThemeLightDarkIcon,
  },
  setup() {
    const state = reactive({
      isDarkMode: true,
    });

    const theme = computed(() =>
      state.isDarkMode ? "dark-mode" : "light-mode"
    );

    const logoSrc = computed(() =>
      state.isDarkMode
        ? require("@/assets/Logoss_inverted.png") // Logo für Dark Mode
        : require("@/assets/Logoss.png") // Logo für Light Mode
    );

    const toggleTheme = () => {
      state.isDarkMode = !state.isDarkMode;
    };

    provide("theme", theme);
    provide("toggleTheme", toggleTheme);

    return {
      theme,
      toggleTheme,
      logoSrc,
    };
  },
};
</script>

<style>
/* Shared Styles */
body {
  margin: 0;
  font-family: "Roboto", sans-serif;
  background-color: var(--background-color);
}

/* Container */
.app-container {
  display: flex;
  height: 100vh;
  flex-direction: row;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Sidebar */
.sidebar {
  width: 80px;
  padding: 20px;
  background-color: var(--sidebar-bg);
  color: var(--sidebar-text);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  transition: width 0.4s ease;
  overflow: hidden;
}

.sidebar:hover {
  width: 250px;
}

.logo-container {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  max-width: 100%;
  max-height: 80px;
  object-fit: contain;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 200px;
}

.sidebar li {
  font-size: 18px;
}

.sidebar li a {
  display: flex;
  align-items: center;
  color: var(--link-color);
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  gap: 15px; /* Einheitlicher Abstand zwischen Icon und Text */
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.sidebar li a:hover {
  background-color: var(--link-hover-bg);
  color: var(--link-hover-color);
}

.icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  fill: var(--link-color);
}

.link-text {
  display: none;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.4s ease, transform 0.4s ease;
  transform: translateX(-10px);
}

.sidebar:hover .link-text {
  display: inline;
  opacity: 1;
  transform: translateX(0);
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  padding: 12px 20px;
  font-size: 16px;
  background-color: var(--button-bg);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.toggle-btn .icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

/* Dark Mode */
.dark-mode {
  --background-color: #0d1117;
  --text-color: #ffffff;
  --sidebar-bg: #161b22;
  --sidebar-text: #ffffff;
  --link-color: #c9d1d9;
  --link-hover-bg: #1f2937;
  --link-hover-color: #58a6ff;
  --button-bg: #21262d;
  --button-hover-bg: #30363d;
}

/* Light Mode */
.light-mode {
  --background-color: #f4f4f9;
  --text-color: #000000;
  --sidebar-bg: #ffffff;
  --sidebar-text: #333333;
  --link-color: #0056b3;
  --link-hover-bg: #e0e0e0;
  --link-hover-color: #0056b3;
  --button-bg: #d1d5db;
  --button-hover-bg: #9ca3af;
}

/* Main Content */
.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: all 0.3s ease;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .app-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    box-shadow: none;
  }

  .main-content {
    margin-top: 20px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    padding: 20px;
  }

  .sidebar ul {
    gap: 15px;
  }

  .sidebar li a {
    font-size: 16px;
    padding: 10px 15px;
  }

  .toggle-btn {
    width: 100%;
    font-size: 14px;
  }

  .main-content {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 100%;
    padding: 15px;
  }

  .sidebar li a {
    font-size: 14px;
    padding: 10px 12px;
  }

  .toggle-btn {
    font-size: 14px;
    padding: 10px;
  }
}
</style>