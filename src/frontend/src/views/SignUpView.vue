<template>
  <div id="app">
    <div class="loginBox">
      <div class="inner">
        <!-- Sign In Form -->
        <div class="signIn" v-if="signIn">
          <div class="top">
            <img
              class="logo"
              src="https://res.cloudinary.com/dc3c8nrut/image/upload/v1685298768/logo-placeholder_l3yodl.png"
              alt="Logo"
            />
            <div class="title">Sign in</div>
            <div class="subtitle">
              Don't have an account?
              <span class="subtitle-action" @click="toggleSignIn">Sign up</span>
            </div>
          </div>
          <form @submit.prevent="handleSignIn">
            <div class="form">
              <input
                type="email"
                placeholder="Email"
                v-model="email.value"
                class="w100"
                :class="{ invalid: email.error }"
                @blur="validateEmail"
                required
              />
              <input
                type="password"
                placeholder="Password"
                v-model="password.value"
                class="w100"
                :class="{ invalid: password.error }"
                @blur="validatePassword"
                required
              />
            </div>
            <button type="submit" class="action" :disabled="!loginValid">Sign In</button>
          </form>
        </div>

        <!-- Register Form -->
        <div class="register" v-else>
          <div class="top">
            <img
              class="logo"
              src="https://res.cloudinary.com/dc3c8nrut/image/upload/v1685298768/logo-placeholder_l3yodl.png"
              alt="Logo"
            />
            <div class="title">Create an Account</div>
            <div class="subtitle">
              Already have an account?
              <span class="subtitle-action" @click="toggleSignIn">Sign In</span>
            </div>
          </div>
          <form @submit.prevent="handleRegister">
            <div class="form">
              <input
                type="text"
                placeholder="Username"
                v-model="myUsername"
                class="w100"
                required
              />
              <input
                type="text"
                placeholder="First Name"
                v-model="firstName"
                class="w100"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                v-model="lastName"
                class="w100"
                required
              />
              <input
                type="email"
                placeholder="Email"
                v-model="email.value"
                class="w100"
                :class="{ invalid: email.error }"
                @blur="validateEmail"
                required
              />
              <input
                type="password"
                placeholder="Password"
                v-model="password.value"
                class="w100"
                :class="{ invalid: password.error }"
                @blur="validatePassword"
                required
              />
            </div>
            <button type="submit" class="action" :disabled="!registerValid">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      emailRegex: /^[\w.-]+@[\w.-]+\.\w+$/,
      firstName: "",
      lastName: "",
      email: { value: "", error: false },
      password: { value: "", error: false },
      signIn: true,
    };
  },
  computed: {
    emailValid() {
      return this.emailRegex.test(this.email.value);
    },
    passwordValid() {
      return this.password.value.length >= 8;
    },
    loginValid() {
      return this.emailValid && this.passwordValid;
    },
    registerValid() {
      return (
        this.firstName.length > 0 &&
        this.lastName.length > 0 &&
        this.emailValid &&
        this.passwordValid
      );
    },
  },
  methods: {
    validateEmail() {
      this.email.error = !this.emailValid;
    },
    validatePassword() {
      this.password.error = !this.passwordValid;
    },
    toggleSignIn() {
      this.signIn = !this.signIn;
    },
    async handleRegister() {
      if (this.registerValid) {
        try {
          const response = await axios.post("http://localhost:5500/api/register", {
            myUsername: this.myUsername.value,
            email: this.email.value,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password.value,
          });
          alert("Registration successful! Check your email for verification.");
          return response;
        } catch (error) {
          console.error("Registration failed:", error);
          alert("Registration failed. Please try again.");
        }
      }
    },
    async handleSignIn() {
      if (this.loginValid) {
        try {
          const response = await axios.post("http://localhost:5600/api/login", {
            email: this.email.value,
            password: this.password.value,
          });
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("firstname", response.data.firstname);
          localStorage.setItem("lastname", response.data.lastname);
          localStorage.setItem("username", response.data.username)

          this.$router.push('/')
        } catch (error) {
          console.error("Sign-in failed:", error);
          alert("Sign-in failed. Please check your credentials.");
        }
      }
    },
  },
};
</script>

<style scoped>
/* General Styles */
html, body {
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  width: 100%;
  padding: 75px;
  background: #2a2a3d;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

/* Form Styles */
form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

input[type="email"], input[type="password"], input[type="text"] {
  width: 50%;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

input:focus {
  border-color: #48c6ef;
  outline: none;
}

.invalid {
  border-color: #e74c3c;
}

button {
  padding: 10px;
  background-color: #48c6ef;
  border: none;
  border-radius: 5px;
  color: black;
  font-size: 1rem;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Additional Styling */
.loginBox {
  text-align: center;
}

.logo {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: bold;
  color: white;
}

.subtitle {
  font-size: 0.9rem;
  margin-bottom: 20px;
  color: white;
}

.subtitle-action {
  color: #48c6ef;
  font-weight: bold;
  cursor: pointer;
}

.subtitle-action:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  #app {
    padding: 15px;
  }

  .title {
    font-size: 1.2rem;
  }

  .subtitle {
    font-size: 0.8rem;
  }
}
</style>
