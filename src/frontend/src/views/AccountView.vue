<template>
  <div class="account-view">
    <div class="form-container">
      <h1>{{ isLogin ? "Login" : "Register" }}</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
          />
        </div>
        <button type="submit" class="btn">
          {{ isLogin ? "Login" : "Register" }}
        </button>
        <p @click="toggleForm" class="toggle-link">
          {{ isLogin ? "Don't have an account? Register" : "Already have an account? Login" }}
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountView",
  data() {
    return {
      isLogin: true, // Toggle between login and register
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
    },
    handleSubmit() {
      if (this.isLogin) {
        // Handle login
        console.log("Logging in with:", this.form);
      } else {
        // Handle registration
        console.log("Registering with:", this.form);
      }
    },
  },
  
};
</script>

