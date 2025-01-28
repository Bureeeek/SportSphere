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
          placeholder="Enter your handle for {{ platform }}" 
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
        <div id="recaptcha-container"></div>
      </div>

      <button type="submit" :disabled="!captchaVerified">Submit</button>
    </form>
  </div>
</template>

<script>
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
      captchaVerified: false, // reCAPTCHA status
      recaptchaWidgetId: null, // reCAPTCHA widget ID
    };
  },
  computed: {
    activePlatforms() {
      return this.selectedPlatforms;
    },
  },
  mounted() {
    // Load reCAPTCHA script dynamically
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/enterprise.js?render=6LcIV8UqAAAAACJnTgVx2U7xBNdv7mirBCAtLbTW";
    script.async = true;
    script.defer = true;
    script.onload = this.renderRecaptcha; // Render the reCAPTCHA once the script loads
    document.head.appendChild(script);
  },
  methods: {
    renderRecaptcha() {
      if (window.grecaptcha) {
        // This will render the reCAPTCHA widget
        window.grecaptcha.enterprise.ready(() => {
          try {
            this.recaptchaWidgetId = window.grecaptcha.enterprise.render('recaptcha-container', {
              sitekey: '6LcIV8UqAAAAACJnTgVx2U7xBNdv7mirBCAtLbTW',
              callback: this.onCaptchaVerified,
            });
            console.log('reCAPTCHA rendered');
          } catch (error) {
            console.error('Error rendering reCAPTCHA:', error);
          }
        });
      }
    },
    onCaptchaVerified(response) {
      console.log("reCAPTCHA Verified:", response);
      if (response) {
        this.captchaVerified = true;
      } else {
        console.error("reCAPTCHA verification failed");
        this.captchaVerified = false;
      }
    },
    resetCaptcha() {
      if (window.grecaptcha && this.recaptchaWidgetId !== null) {
        window.grecaptcha.reset(this.recaptchaWidgetId); // Reset the reCAPTCHA
        this.captchaVerified = false;
      }
    },

    async submitForm() {
      if (this.captchaVerified) {
        try {
          // Execute reCAPTCHA to get a fresh token
          const token = await window.grecaptcha.enterprise.execute('6LcIV8UqAAAAACJnTgVx2U7xBNdv7mirBCAtLbTW', { action: 'submitForm' });
          console.log("reCAPTCHA Token:", token);

          // Prepare data to send to backend
          const verificationData = {
            selectedPlatforms: this.selectedPlatforms,
            handles: this.handles,
            reason: this.reason,
            articles: this.articles,
            captchaToken: token,
          };

          // Send the data to your backend API
          await this.sendVerificationDataToBackend(verificationData);
          alert("Your verification request has been submitted!");
        } catch (error) {
          console.error("Error executing reCAPTCHA:", error);
          alert("reCAPTCHA error, please try again.");
        }
      } else {
        alert("Please complete the CAPTCHA.");
      }
    },

// Method to send the verification data to your backend
async sendVerificationDataToBackend(verificationData) {
  try {
    const response = await fetch('/api/verify-captcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(verificationData),
    });
    const data = await response.json();
    if (data.success) {
      console.log("Backend verification successful:", data);
    } else {
      console.log("Backend verification failed:", data);
    }
  } catch (error) {
    console.error("Error sending verification data to backend:", error);
  }
}

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
