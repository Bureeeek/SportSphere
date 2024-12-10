<template>
  <div id="app" class="app-container">
    <!-- Sidebar -->
    <nav class="sidebar">
      <ul>
        <li><router-link to="/news">News</router-link></li>
        <li><router-link to="/create">Create</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/account">Account</router-link></li>
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
  name: 'App'
}
</script>

<style>
/* Basic styles */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #1e1e2f;
  color: white;
}

.app-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background-color: #2a2a3d;
  padding: 20px;
  text-align: center;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin: 15px 0;
  font-size: 18px;
}

.sidebar li a {
  background-color: #666; /* setzt die Hintergrundfarbe auf dunkelgrau */
  color: white; /* setzt die Textfarbe auf weiß */
  padding: 10px 20px; /* fügt einen Abstand zwischen dem Text und der Umrandung hinzu */
  border-radius: 5px; /* rundet die Ecken der Buttons */
  text-decoration: none; /* entfernt die Unterstreichung des Links */
  display: block; /* macht den Link zu einem Block-Element, um ihn zu zentrieren */
}

.sidebar li a:hover {
  background-color: #ccc; /* setzt die Hintergrundfarbe auf hellgrau beim Hover */
}

.main-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
