<template>
  <div class="about-page">
    <!-- Quick About Us Description -->
    <header class="about-header">
      <h1>About Sportsphere</h1>
      <p class="about-description">
        Welcome to <strong>SportSphere</strong>, your ultimate destination for up-to-the-minute sports news, 
        in-depth analysis, and engaging stories from around the world.
      </p>
    </header>

    <!-- Our Mission Section -->
    <section class="about-container">
      <div class="about-section">
        <img src="path-to-mission-image.jpg" alt="Our Mission Image" class="section-image" />
        <div class="section-content">
          <h2>Our Mission</h2>
          <p>
            At SportSphere, our mission is to provide a way for an everyday sports fan to get their voice out! Join others
            to exchange your insider knowledge in the world of sports, drop a hot take, or just write about your favorite 
            club's current bad run of form.
          </p>
        </div>
      </div>
    </section>

    <!-- Meet Our Team Section -->
    <section class="about-container">
      <div class="about-section">
        <img src="path-to-team-image.jpg" alt="Meet Our Team Image" class="section-image" />
        <div class="section-content">
          <h2>Meet Our Team</h2>
          <p>
            YOU are part of our team. We rely on people that are passionate about their work to publish their articles on our
            webpage.
          </p>
        </div>
      </div>
    </section>

    <!-- Our Vision Section -->
    <section class="about-container">
      <div class="about-section">
        <img src="path-to-vision-image.jpg" alt="Our Vision Image" class="section-image" />
        <div class="section-content">
          <h2>Our Vision</h2>
          <p>
            We envision a world where sports bring people together, spark conversations, and inspire the next 
            generation of athletes and fans alike.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-container">
      <h2>Contact & Direction</h2>
      <div class="contact-content">
        <p>HTL Dornbirn</p>
        <p>Höchsterstraße 73</p>
        <p>6850 Dornbirn</p>
        <a 
          href="https://www.google.at/maps/place/HTL+Dornbirn/@47.4138495,9.7207298,17z/data=!3m2!4b1!5s0x479b14b99678cea7:0x4b68c57136f3426b!4m6!3m5!1s0x479b15000a3b4579:0xac8b9e0f951a3f9c!8m2!3d47.4138459!4d9.7233047!16s%2Fg%2F11vrg01zxm?entry=ttu&g_ep=EgoyMDI1MDExNC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank">
          <img src="path-to-contact-map-image.jpg" alt="Map to HTL Dornbirn" class="contact-map-image" />
        </a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped src="../css/AboutView.css"></style>
