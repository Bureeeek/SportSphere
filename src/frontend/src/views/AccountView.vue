<template>
  <div class="account-info">
    <h2>Account Information</h2>
    <p><strong>Email:</strong> {{ accountInfo.email }}</p>
    <p><strong>First Name:</strong> {{ accountInfo.firstName }}</p>
    <p><strong>Last Name:</strong> {{ accountInfo.lastName }}</p>

    <button @click="signOut">Sign Out</button>
  </div>
</template>

<script>
export default {
  name: "AccountInfo",
  data() {
    return {
      accountInfo: {
        email: localStorage.getItem("email"),
        firstName: localStorage.getItem("firstname"),
        lastName: localStorage.getItem("lastname"),
        username: localStorage.getItem("username"),
      },
    };
  },
  methods: {
    async fetchAccountInfo() {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          alert("You are not logged in.");
          return;
        }
        
        // this.accountInfo = response.data;
      } catch (error) {
        console.error("Error fetching account info:", error);
        alert("Failed to fetch account information. Please log in again.");
        this.signOut();
      }
    },
    signOut() {
      localStorage.clear();
      alert("You have been signed out.");
      this.$router.push("/signup"); // Redirect to login page if using Vue Router
    },
  },
  mounted() {
    this.fetchAccountInfo();
  },
};
</script>

<style scoped>
.account-info {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
