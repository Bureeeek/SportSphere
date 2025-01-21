<template>
  <div class="create-view">
    <h1>Create article</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          v-model="news.title"
          placeholder="Enter your title"
          required
        />
      </div>

      <div class="form-group">
        <label for="summary">Summary</label>
        <textarea
          id="summary"
          v-model="news.summary"
          placeholder="This will be displayed on the news page"
          required
        ></textarea>
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
        <input
          type="text"
          id="tags"
          v-model="news.tags"
          placeholder="Enter tags"
        />
      </div>

      <div class="form-group">
        <label for="content">Content</label>
        <textarea
          id="content"
          v-model="news.content"
          placeholder="Enter the content"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="media">Media</label>
        <input type="file" id="media" @change="handleMediaUpload" />
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
      mediaFile: null, // Storing the selected media file
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

        // Check if a file was selected
        if (this.mediaFile) {
          formData.append('media', this.mediaFile); // Append the file
        }

        const response = await axios.post(
          'http://localhost:5000/api/create-article',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );

        alert('Article created successfully!');
        console.log(response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to create article. Please try again.');
      }
    },

    handleMediaUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image')) {
        this.mediaFile = file;
      } else {
        alert('Please upload a valid image file.');
        this.mediaFile = null;
      }
    },
  },
};
</script>


<style scoped src="../css/CreateView.css"></style>