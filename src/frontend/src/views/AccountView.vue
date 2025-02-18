<template>
  <div class="account-info">
    <div class="sidebar">
      <div class="user-details">
        <div class="avatar"></div>
        <p class="username">{{ accountInfo.username }}</p>
        <p class="email">{{ accountInfo.email }}</p>
      </div>
      <ul class="menu">
        <li @click="activeSection = 'personal'" :class="{ active: activeSection === 'personal' }">Personal Information</li>
        <li @click="activeSection = 'news'" :class="{ active: activeSection === 'news' }">My News Contributions</li>
        <li @click="activeSection = 'verification'" :class="{ active: activeSection === 'verification' }">Get Verified</li>
      </ul>
    </div>

    <div class="account-card" v-if="activeSection === 'personal'">
      <h2 class="title">Personal Information</h2>
      <div class="info-grid">
        <!-- Name -->
        <div class="info-item">
          <p><strong>Name:</strong></p>
          <div v-if="isEditing.name">
            <input v-model="editedValues.firstName" class="edit-input" placeholder="First Name" />
            <input v-model="editedValues.lastName" class="edit-input" placeholder="Last Name" />
            <input type="password" v-model="confirmPassword" class="edit-input" placeholder="Confirm Password" />
            <button class="btn-save" @click="saveChange('name')">Save</button>
          </div>
          <div v-else>
            <p>{{ accountInfo.firstName }} {{ accountInfo.lastName }}</p>
            <button class="btn-design" @click="toggleEdit('name')">Change Name</button>
          </div>
        </div>

        <!-- Email -->
        <div class="info-item">
          <p><strong>Email:</strong></p>
          <div v-if="isEditing.email">
            <input v-model="editedValues.email" class="edit-input" />
            <input type="password" v-model="confirmPassword" class="edit-input" placeholder="Confirm Password" />
            <button class="btn-save" @click="saveChange('email')">Save</button>
          </div>
          <div v-else>
            <p>{{ accountInfo.email }}</p>
            <button class="btn-design" @click="toggleEdit('email')">Change Email</button>
          </div>
        </div>

        <!-- Username -->
        <div class="info-item">
          <p><strong>Username:</strong></p>
          <div v-if="isEditing.username">
            <input v-model="editedValues.username" class="edit-input" />
            <input type="password" v-model="confirmPassword" class="edit-input" placeholder="Confirm Password" />
            <button class="btn-save" @click="saveChange('username')">Save</button>
          </div>
          <div v-else>
            <p>{{ accountInfo.username }}</p>
            <button class="btn-design" @click="toggleEdit('username')">Change Username</button>
          </div>
        </div>

        <!-- Password -->
        <div class="info-item">
          <p><strong>Password:</strong></p>
          <div v-if="isEditing.password">
            <input type="password" v-model="editedValues.password" class="edit-input" placeholder="New Password" />
            <input type="password" v-model="confirmPassword" class="edit-input" placeholder="Confirm Current Password" />
            <button class="btn-save" @click="saveChange('password')">Save</button>
          </div>
          <div v-else>
            <p>********</p>
            <button class="btn-design" @click="toggleEdit('password')">Change Password</button>
          </div>
        </div>
      </div>
      <button class="sign-out-btn" @click="signOut">Sign Out</button>
    </div>

    <div class="account-card" v-if="activeSection === 'news'">
      <h2 class="title">My News Contributions</h2>

      <div class="contributions-section">
        <p v-if="myArticles.length === 0">You have not submitted any articles yet.</p>
        <ul v-else>
          <li v-for="article in myArticles" :key="article._id">
            <strong>{{ article.title }}</strong> - {{ new Date(article.publicationDate).toLocaleDateString() }}
          </li>
        </ul>
        <button class="btn-design" @click="goToCreateArticle">Write a New Article</button>
      </div>

      <button class="sign-out-btn" @click="signOut">Sign Out</button>
    </div>

    <div class="account-card" v-if="activeSection === 'verification'">
      <h2 class="title">Get Verified</h2>
      <p>Verification process details go here...</p>
      <button class="sign-out-btn" @click="signOut">Sign Out</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountInfo",
  data() {
    return {
      activeSection: 'personal',
      accountInfo: {
        email: localStorage.getItem("email"),
        firstName: localStorage.getItem("firstname"),
        lastName: localStorage.getItem("lastname"),
        username: localStorage.getItem("username"),
      },
      isEditing: {
        name: false,
        email: false,
        username: false,
        password: false,
      },
      editedValues: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
      },
      confirmPassword: "",
      myArticles: [],
    };
  },
  methods: {
    toggleEdit(field) {
      this.isEditing[field] = true;
      if (field === "name") {
        this.editedValues.firstName = this.accountInfo.firstName;
        this.editedValues.lastName = this.accountInfo.lastName;
      } else {
        this.editedValues[field] = this.accountInfo[field] || "";
      }
    },
    async saveChange(field) {
      if (!this.confirmPassword.trim()) {
        alert("Please confirm your password.");
        return;
      }

      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          alert("You are not logged in.");
          return;
        }

        let requestBody = { field, value: this.editedValues[field], confirmPassword: this.confirmPassword };
        if (field === "name") {
          requestBody = {
            field: "name",
            firstName: this.editedValues.firstName,
            lastName: this.editedValues.lastName,
            confirmPassword: this.confirmPassword,
          };
        }

        const response = await fetch("http://localhost:5500/api/update-account", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        if (response.ok) {
          if (field === "name") {
            this.accountInfo.firstName = this.editedValues.firstName;
            this.accountInfo.lastName = this.editedValues.lastName;
            localStorage.setItem("firstname", this.editedValues.firstName);
            localStorage.setItem("lastname", this.editedValues.lastName);
          } else {
            this.accountInfo[field] = this.editedValues[field];
            localStorage.setItem(field, this.editedValues[field]);
          }
          this.isEditing[field] = false;
        } else {
          alert(data.message || "Update failed.");
        }
      } catch (error) {
        console.error("Update error:", error);
        alert("Something went wrong. Please try again.");
      }
    },
    signOut() {
      localStorage.clear();
      alert("You have been signed out.");
      this.$router.push("/signup");
    },
    goToCreateArticle() {
    this.$router.push("/create");
  },
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

.edit-input {
  width: 80%;
  padding: 8px;
  margin-right: 5px;
}

.btn-save {
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.btn-save:hover {
  background-color: #45a049;
}
</style>
