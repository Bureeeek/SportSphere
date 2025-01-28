<template>
  <div class="account-info">
    <div class="sidebar">
      <div class="user-details">
        <div class="avatar"></div>
        <p class="username">{{ accountInfo.username }}</p>
        <p class="email">{{ accountInfo.email }}</p>
      </div>
      <ul class="menu">
        <li>Personal Information</li>
        <li>My News Contributions</li>
        <li>Get Verified</li>
      </ul>
    </div>
    <div class="account-card">
      <h2 class="title">Personal Information</h2>
      <div class="info-grid">
        <div class="info-item">
          <p><strong>Name:</strong></p>
          <p>{{ accountInfo.firstName }} {{ accountInfo.lastName }}</p>
          <button class="btn-design">Change Name</button>
        </div>
        <div class="info-item">
          <p><strong>Email:</strong></p>
          <p>{{ accountInfo.email }}</p>
          <button class="btn-design">Change E-Mail</button>
        </div>
        <div class="info-item">
          <p><strong>Username:</strong></p>
          <p>{{ accountInfo.username }}</p>
          <button class="btn-design">Change Username</button>
        </div>
        <div class="info-item">
          <p><strong>Password:</strong></p>
          <p>********</p>
          <button class="btn-design">Change Password</button>
        </div>
      </div>

      <h2 class="title">Get Verified</h2>
      <div class="verification-section">
        <p>Become a verified contributor to gain more visibility and credibility for your articles.</p>
        <button class="btn-design">Apply for Verification</button>
      </div>

      <h2 class="title">My News Contributions</h2>
      <div class="contributions-section">
        <p>You have not submitted any articles yet.</p>
        <button class="btn-design">Write a New Article</button>
      </div>

      <button class="sign-out-btn" @click="signOut">Sign Out</button>
    </div>
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
        // Fetch logic can be implemented here
      } catch (error) {
        console.error("Error fetching account info:", error);
        alert("Failed to fetch account information. Please log in again.");
        this.signOut();
      }
    },
    signOut() {
      localStorage.clear();
      alert("You have been signed out.");
      this.$router.push("/signup");
    },
  },
  mounted() {
    this.fetchAccountInfo();
  },
};
</script>

<style scoped>
.account-info {
  display: flex;
  min-height: 100vh;
  background-color: #121212;
  color: #e0e0e0;
}

.sidebar {
  background: #1f1f1f;
  padding: 20px;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-details {
  text-align: center;
  margin-bottom: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  background-color: #3f3f3f;
  border-radius: 50%;
  margin-bottom: 10px;
}

.username {
  font-size: 1.2rem;
  font-weight: bold;
}

.email {
  font-size: 0.9rem;
  color: #b0b0b0;
}

.menu {
  list-style: none;
  padding: 0;
  width: 100%;
}

.menu li {
  padding: 10px 20px;
  text-align: left;
  color: #e0e0e0;
  cursor: pointer;
  transition: background 0.3s ease;
}

.menu li:hover {
  background: #2a2a2a;
}

.account-card {
  flex: 1;
  background: #1e1e1e;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.info-item {
  background: #2a2a2a;
  padding: 10px;
  border-radius: 5px;
}

.verification-section {
  background: #2a2a2a;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.btn-design {
  padding: 10px 20px;
  background-color: #bb86fc;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-design:hover {
  background-color: #9a68df;
}

.contributions-section {
  background: #2a2a2a;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.password-section {
  background: #2a2a2a;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.sign-out-btn {
  padding: 10px 20px;
  background-color: #cf6679;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sign-out-btn:hover {
  background-color: #b45562;
}
</style>
