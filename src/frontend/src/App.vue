<template>
  <div :class="['app-container', theme]">
    <!-- Sidebar -->
    <nav class="sidebar">
      <ul>
        <li><router-link to="/#">News</router-link></li>
        <li><router-link to="/create">Create</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/account">Account</router-link></li>
      </ul>
      <button @click="toggleTheme" class="toggle-btn">
        {{ theme === 'dark-mode' ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
      </button>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { provide, reactive, computed } from 'vue';

export default {
  name: 'App',
  setup() {
    // Reactive state for theme
    const state = reactive({
      isDarkMode: true, // Default theme
    });

    // Computed property for theme class
    const theme = computed(() => (state.isDarkMode ? 'dark-mode' : 'light-mode'));

    // Toggle theme method
    const toggleTheme = () => {
      state.isDarkMode = !state.isDarkMode;
    };

    // Provide theme and toggle function
    provide('theme', theme);
    provide('toggleTheme', toggleTheme);

    return {
      theme,
      toggleTheme,
    };
  },
};
</script>

<style>
/* Shared Styles */
body {
  margin: 0;
  font-family: 'Roboto', sans-serif; /* Professionellere Schriftart */
  background-color: var(--background-color);
}

/* Container für die gesamte App */
.app-container {
  display: flex;
  height: 100vh;
  flex-direction: row;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Sidebar */
.sidebar {
  width: 250px;
  padding: 30px;
  background-color: var(--sidebar-bg);
  color: var(--sidebar-text);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* Sidebar Links */
.sidebar ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar li {
  font-size: 18px;
}

.sidebar li a {
  color: var(--link-color);
  padding: 12px 20px;
  border-radius: 8px;
  text-decoration: none;
  display: block;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.sidebar li a:hover {
  background-color: var(--link-hover-bg);
  color: var(--link-hover-color);
}

.toggle-btn {
  margin-bottom: 40px;
  padding: 12px 20px;
  font-size: 16px;
  background-color: var(--button-bg);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.toggle-btn:hover {
  background-color: var(--button-hover-bg);
}

/* Dark Mode */
.dark-mode {
  --background-color: #1e1e2f;
  --sidebar-bg: #2a2a3d;
  --sidebar-text: white;
  --link-color: white;
  --link-hover-bg: #444;
  --link-hover-color: #f4f4f9;
  --button-bg: #444;
  --button-hover-bg: #666;
}

/* Light Mode */
.light-mode {
  --background-color: #f4f4f9;
  --sidebar-bg: #ffffff;
  --sidebar-text: black;
  --link-color: #333;
  --link-hover-bg: #ddd;
  --link-hover-color: #333;
  --button-bg: #ddd;
  --button-hover-bg: #bbb;
}

/* Main Content Area */
.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: var(--background-color);
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
  