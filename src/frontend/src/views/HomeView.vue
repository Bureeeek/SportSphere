<template>
  <div class="home">
    <h1>News Articles</h1>
    <div v-if="loading">Loading articles...</div>
    <div v-else-if="error">Error: {{ error }} <button @click="fetchArticles()">Reload</button></div>
    <div v-else>
      <div v-for="article in articles" :key="article._id" class="article">
        <h2>{{ article.title }}</h2>
        <p><strong>Summary:</strong> {{ article.summary }}</p>
        <p><strong>Category:</strong> {{ article.category }}</p>
        <p><strong>Tags:</strong> {{ article.tags.join(', ') }}</p>
        <p><strong>Publication Date:</strong> {{ new Date(article.publicationDate).toLocaleDateString() }}</p>
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

<style>
.home {
  padding: 20px;
}

.article {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 15px;
}
</style>
