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
        <img src="@/assets/OurMissionImage.webp" alt="Our Mission Image" class="section-image" />
        <div class="section-content">
          <h2>Our Mission</h2>
          <p>
            At SportSphere, our mission is to provide a platform where every sports fan can have their voice heard. 
            Whether you're an expert analyst or just an enthusiastic fan, we give you the tools to share your insights, 
            opinions, and stories. Write about your team's highs and lows, explore the hidden gems of niche sports, 
            or create deep dives into the history and tactics of your favorite games.<br/><br/>
            We believe that every fan has a unique perspective, and it's our goal to empower you to share it with a 
            global community of sports lovers. By connecting fans and fostering conversations, SportSphere is not 
            just a website—it's a movement to democratize sports reporting and storytelling.<br/><br/>
            Join us in redefining how sports stories are told—by fans, for fans.
          </p>
        </div>
      </div>
    </section>

    <!-- Meet Our Team Section -->
    <section class="about-container">
      <div class="about-section">
        <img src="@/assets/MeetOurTeamImage.jpg" alt="Meet Our Team Image" class="section-image" />
        <div class="section-content">
          <h2>Meet Our Team</h2>
          <p>
            At SportSphere, our team is made up of the most passionate sports enthusiasts—you! From amateur writers 
            to professional journalists, we rely on contributions from people who care deeply about the games they 
            love. Whether you're writing an in-depth article about a championship match or sharing your experience 
            attending a local game, your stories are what make this platform thrive.<br/><br/>
            By encouraging user-generated content, we're building a diverse and inclusive space where everyone has 
            an equal opportunity to showcase their passion and creativity. No matter your background or expertise, 
            SportSphere is your home for authentic and dynamic sports storytelling.<br/><br/>
            Become a part of the SportSphere family, and help us build a vibrant, community-driven sports network.
          </p>
        </div>
      </div>
    </section>

    <!-- Our Vision Section -->
    <section class="about-container">
      <div class="about-section">
        <img src="@/assets/OurVisionImage.jpg" alt="Our Vision Image" class="section-image" />
        <div class="section-content">
          <h2>Our Vision</h2>
          <p>
            We envision a world where sports serve as a unifying force, breaking down barriers and sparking meaningful 
            conversations. SportSphere is dedicated to creating a global community where fans from every corner of the 
            world can come together, share their love for sports, and inspire others.<br/><br/>
            Our platform aims to be a beacon of creativity and collaboration, where innovative ideas and unique 
            perspectives flourish. By fostering a space for meaningful dialogue and storytelling, we hope to bridge 
            gaps between fans, athletes, and the sports industry.<br/><br/>
            Together, we can build a world where sports don't just entertain—they inspire, educate, and connect people 
            across cultures and generations.
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
          <img src="@/assets/ContactImage.png" alt="Map to HTL Dornbirn" class="contact-map-image" />
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

