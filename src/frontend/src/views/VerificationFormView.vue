<template>
  <div class="verification-form">
    <h2>Verification Form</h2>
    <p>Fill out this form to apply for verification as a contributor.</p>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="platforms">Select Social Media Platforms:</label>
        <div v-for="platform in platforms" :key="platform.value">
          <input 
            type="checkbox" 
            :id="platform.value" 
            :value="platform.value" 
            v-model="selectedPlatforms" 
          />
          <label :for="platform.value">{{ platform.label }}</label>
        </div>
      </div>

      <div v-for="platform in activePlatforms" :key="platform" class="form-group">
        <label :for="platform + '-handle'">{{ platform }} Handle:</label>
        <input 
          type="text" 
          :id="platform + '-handle'" 
          v-model="handles[platform]" 
          placeholder="Enter your handle"
          required
        />
      </div>

      <div class="form-group">
        <label for="reason">Why do you want to be verified?</label>
        <textarea 
          id="reason" 
          v-model="reason" 
          placeholder="Explain why you should be verified" 
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="articles">Link to Your Best Articles:</label>
        <input 
          type="url" 
          id="articles" 
          v-model="articles" 
          placeholder="Enter a URL to your articles"
        />
      </div>

      <div class="form-group">
        <div id="hcaptcha-container"></div>
      </div>

      <button type="submit" :disabled="!captchaVerified">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "VerificationForm",
  data() {
    return {
      platforms: [
        { label: "Twitter", value: "Twitter" },
        { label: "Bluesky", value: "Bluesky" },
        { label: "Instagram", value: "Instagram" },
      ],
      selectedPlatforms: [],
      handles: {
        Twitter: "",
        Bluesky: "",
        Instagram: "",
      },
      reason: "",
      articles: "",
      captchaVerified: false, 
      captchaResponse: null, 
    };
  },
  computed: {
    activePlatforms() {
      return this.selectedPlatforms;
    },
  },
  mounted() {
    const script = document.createElement("script");
    script.src = "https://js.hcaptcha.com/1/api.js";
    script.async = true;
    script.defer = true;
    script.onload = this.renderHCaptcha;
    document.head.appendChild(script);
  },
  methods: {
    renderHCaptcha() {
      if (window.hcaptcha) {
        window.hcaptcha.render("hcaptcha-container", {
          sitekey: process.env.VUE_APP_HCAPTCHA_SITE_KEY,
          callback: this.onCaptchaVerified,
          "expired-callback": this.onCaptchaExpired,
        });
      }
    },
    onCaptchaVerified(response) {
      this.captchaVerified = true;
      this.captchaResponse = response;
    },
    onCaptchaExpired() {
      this.captchaVerified = false;
      this.captchaResponse = null;
    },
    async submitForm() {
      if (!this.captchaVerified) {
        alert("Please complete the CAPTCHA.");
        return;
      }

      const verificationData = {
        selectedPlatforms: this.selectedPlatforms,
        handles: this.handles,
        reason: this.reason,
        articles: this.articles,
        captchaResponse: this.captchaResponse,
      };

      try {
        await axios.post("http://localhost:5800/api/verify-user", verificationData);
        alert("Your verification request has been submitted!");
      } catch (error) {
        console.error("Error submitting verification request:", error);
        alert("Error submitting request.");
      }
    },
  },
};
</script>



<style scoped>
.verification-form {
  max-width: 600px;
  margin: 0 auto;
  background: #1e1e1e;
  color: #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, textarea, button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
}

button {
  background-color: #bb86fc;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #6b6b6b;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #9a68df;
}
</style>