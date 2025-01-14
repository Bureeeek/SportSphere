<template>
  <div class="news-page">
    <h1>News Articles</h1>

    <div v-if="loading" class="loading">Loading articles...</div>
    <div v-else-if="error" class="error">
      Error: {{ error }} <button @click="fetchArticles()">Reload</button>
    </div>

    <div v-else>
      <div v-for="article in articles" :key="article._id" class="article-card">
        <div class="article-image-container">
          <img :src="article.imageUrl" alt="Article image" class="article-image" />
        </div>
        <div class="article-content">
          <h2>{{ article.title }}</h2>
          <p><strong>Summary:</strong> {{ article.summary }}</p>
          <p><strong>Category:</strong> {{ article.category }}</p>
          <p><strong>Tags:</strong> {{ article.tags.join(', ') }}</p>
          <p><strong>Publication Date:</strong> {{ new Date(article.publicationDate).toLocaleDateString() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      articles: [],
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:5001/api/articles');
        this.articles = response.data;
      } catch (err) {
        this.error = 'Failed to load articles. Please try again later.';
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.news-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #121212;
  color: #fff;
}

.loading,
.error {
  font-size: 16px;
  color: #aaa;
}

.error button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #ff5733;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.article-card {
  background-color: #1e1e1e;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

.article-image-container {
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 10px;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  padding: 10px;
}

.article-content h2 {
  font-size: 20px;
  margin: 0;
}

.article-content p {
  font-size: 14px;
  color: #aaa;
  margin: 5px 0;
}
</style>
