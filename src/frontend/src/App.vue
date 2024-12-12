<template>
  <div :class="['app-container', theme]">
    <!-- Sidebar -->
    <nav class="sidebar">
      <ul>
        <li><router-link to="/news">News</router-link></li>
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
  font-family: Arial, sans-serif;
}

.app-container {
  display: flex;
  height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 200px;
  padding: 20px;
  text-align: center;
}

.sidebar ul {
   list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column; /* Spread buttons vertically */
  gap: 15px; /* Adds space between buttons */
}

.sidebar li {
  margin: 15px 0;
  font-size: 18px;
}

.sidebar li a {
 
  color: white; /* setzt die Textfarbe auf weiß */
  padding: 10px 20px; /* fügt einen Abstand zwischen dem Text und der Umrandung hinzu */
  border-radius: 5px; /* rundet die Ecken der Buttons */
  text-decoration: none; /* entfernt die Unterstreichung des Links */
  display: block; /* macht den Link zu einem Block-Element, um ihn zu zentrieren */
}

.sidebar li a:hover {
  background-color: #ccc; /* setzt die Hintergrundfarbe auf hellgrau beim Hover */
}

.toggle-btn {
  margin-top: 20px;
  padding: 10px;
  font-size: 14px;
  background-color: #444;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.toggle-btn:hover {
  background-color: #666;
}

/* Dark Mode */
.dark-mode {
  background-color: #1e1e2f;
  color: white;
}

.dark-mode .sidebar {
  background-color: #2a2a3d;
}

/* Light Mode */
.light-mode {
  background-color: #f4f4f9;
  color: black;
}

.light-mode .sidebar {
  background-color: #fff;
  border-right: 1px solid #ddd;
}

.light-mode .toggle-btn {
  background-color: #ddd;
  color: black;
}

.light-mode .toggle-btn:hover {
  background-color: #bbb;
}
</style>
  