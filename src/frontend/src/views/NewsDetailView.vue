<template>
  <div class="news-detail">
    <div v-if="loading" class="loading">Loading article...</div>
    <div v-else-if="error" class="error">
      Error: {{ error }}
      <button @click="fetchArticle()">Retry</button>
    </div>
    <div v-else>
      <div class="article-container">
        <img
          v-if="article.media && article.media.length > 0"
          :src="article.media[0]"
          alt="Article Image"
          class="article-image"
        />
        <div class="text-container">
          <h1>{{ article.title }}</h1>
          <div class="meta-info">
            <span class="category">{{ article.category }}</span>
            <span class="date">{{ formatDate(article.publicationDate) }}</span>
            <span class="username">{{ article.authorUsername }}</span>
          </div>
          <p v-html="formattedContent"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewsDetailView',
  props: ['id'],
  data() {
    return {
      article: null,
      loading: true,
      error: null,
    };
  },
  computed: {
    formattedContent() {
      return this.article.content ? this.article.content.replace(/\n/g, '<br>') : '';
    },
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
        this.error = 'Failed to load article.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      return dateString ? new Date(dateString).toLocaleDateString() : 'Unknown date';
    },
  },
};
</script>

<style scoped>
.news-detail {
  padding: 40px 8%;
  color: var(--text-color);
  background-color: var(--background-color);
}

.article-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Bild nimmt jetzt mehr Breite ein */
.article-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 12px;
}

/* Text nimmt mehr Breite ein */
.text-container {
  max-width: 90%;
  margin: 0 auto;
}

h1 {
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Meta-Info Styling */
.meta-info {
  display: flex;
  gap: 20px;
  align-items: center;
}

.category {
  background-color: #007bff;
  color: white;
  padding: 8px 14px;
  border-radius: 5px;
  font-size: 1em;
}

.date {
  color: #aaa;
  font-size: 1em;
}

p {
  font-size: 1.3em;
  line-height: 1.8;
  text-align: justify;
}

/* Responsive Anpassung */
@media (min-width: 1000px) {
  .article-container {
    display: flex;
    flex-direction: column;
    max-width: 1200px;
  }

  .article-image {
    max-height: 600px;
  }

  .text-container {
    max-width: 100%;
  }
}
</style>
