<template>
  <div class="create-view">
    <h1>Create article</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="news.title" required />
      </div>

      <div class="form-group">
        <label for="summary">Summary</label>
        <textarea id="summary" v-model="news.summary" required></textarea>
      </div>

      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" v-model="news.category" required>
          <option disabled value="">Select category</option>
          <option>Football</option>
          <option>Basketball</option>
          <option>Tennis</option>
          <option>Badminton</option>
        </select>
      </div>

      <div class="form-group">
        <label for="tags">Tags</label>
        <input type="text" id="tags" v-model="news.tags" />
      </div>

      <div class="form-group">
        <label for="content">Content</label>
        <textarea id="content" v-model="news.content" required></textarea>
      </div>

      <div class="form-group">
        <label for="media">Upload Image</label>
        <input type="file" id="media" @change="handleMediaUpload" accept="image/*" />
      </div>

      <button type="submit">Create article</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      news: {
        title: '',
        summary: '',
        category: '',
        tags: '',
        content: '',
      },
      mediaFile: null, // Nur ein Bild
    };
  },
  methods: {
    async submitForm() {
      try {
        const formData = new FormData();
        formData.append('title', this.news.title);
        formData.append('summary', this.news.summary);
        formData.append('category', this.news.category);
        formData.append('tags', this.news.tags);
        formData.append('content', this.news.content);
        formData.append('publicationDate', new Date().toISOString());

        // **Bild hinzufügen**
        if (this.mediaFile) {
          formData.append('media', this.mediaFile);
        }

        // **Sende die Anfrage an das Backend**
        const response = await axios.post('http://10.110.48.248:5000/api/create-article', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        alert('Article created successfully!');
        console.log(response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to create article. Please try again.');
      }
    },

    handleMediaUpload(event) {
      this.mediaFile = event.target.files[0];
    },
  },
};
</script>

<style scoped src="../css/CreateView.css"></style>
