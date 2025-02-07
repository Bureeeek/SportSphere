<template>
  <div class="news-detail">
    <div v-if="loading" class="loading">Loading article...</div>
    <div v-else-if="error" class="error">
      Error: {{ error }}
      <button @click="fetchArticle()">Retry</button>
    </div>
    <div v-else>
      <div class="article-header">
        <img v-if="article.media && article.media.length > 0" 
             :src="article.media[0]" 
             alt="Article Image" 
             class="article-image"/>
        <h1>{{ article.title }}</h1>
        <p class="meta">
          <strong>Category:</strong> {{ article.category }} | 
          <strong>Published:</strong> {{ formatDate(article.publicationDate) }}
        </p>
      </div>
      <div class="article-content">
        <p>{{ article.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "NewsDetailView",
  props: ["id"],
  data() {
    return {
      article: null,
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchArticle();
  },
  methods: {
    async fetchArticle() {
      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:5001/api/articles/${this.id}`);
        this.article = response.data;
      } catch (err) {
        this.error = "Failed to load article.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      return dateString ? new Date(dateString).toLocaleDateString() : "Unknown date";
    }
  }
};
</script>


<style scoped>
.news-detail-page {
  padding: 20px;
  color: white;
}

.news-header {
  text-align: center;
  margin-bottom: 20px;
}

.article-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
}

.news-content {
  font-size: 18px;
  line-height: 1.6;
}
</style>
