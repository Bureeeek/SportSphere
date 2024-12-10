<template>
  <div :class="['app-container', isDarkMode ? 'dark-mode' : 'light-mode']" id="app">
    <!-- Sidebar -->
    <nav class="sidebar">
      <ul>
        <li><router-link to="/news">News</router-link></li>
        <li><router-link to="/create">Create</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/account">Account</router-link></li>
        <li>
          <button @click="toggleDarkMode" class="toggle-btn">
            {{ isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
          </button>
        </li>
      </ul>
      
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isDarkMode: true, // Default mode
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
  },
};
</script>

<style>
/* Basic styles */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  display: flex;
  height: 100vh;
}

/* Sidebar styles */
.sidebar {
  width: 200px;
  padding: 20px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin: 15px 0;
  font-size: 18px;
}

.toggle-btn {
  margin-top: 20px;
  padding: 10px;
  font-size: 14px;
  background-color: #00000000;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.toggle-btn:hover {
  background-color: #00000000;
}

/* Main content styles */
.main-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Dark mode styles */
.dark-mode {
  background-color: #1e1e2f;
  color: white;
}

.dark-mode .sidebar {
  background-color: #2a2a3d;
}

.dark-mode .toggle-btn {
  background-color: #00000000;
  color: white;
}

/* Light mode styles */
.light-mode {
  background-color: #f4f4f9;
  color: black;
}

.light-mode .sidebar {
  background-color: #fff;
  color: black;
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
