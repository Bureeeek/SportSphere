<template>
  <div class="news-page">
    <h1>News Articles</h1>

    <div v-if="loading" class="loading">Loading articles...</div>

    <div v-else-if="error" class="error">
      Error: {{ error }} 
      <button @click="fetchArticles()">Reload</button>
    </div>

    <div v-else>
      <div v-if="articles.length > 0" class="main-article">
        <div class="article-image-container">
          <img v-if="articles[0].media && articles[0].media.length > 0" 
               :src="articles[0].media[0]" 
               alt="Main Article image" 
               class="main-article-image" />
        </div>
        <div class="article-content">
          <h2>{{ articles[0].title }}</h2>
          <p><strong>Summary:</strong> {{ articles[0].summary }}</p>
          <p><strong>Category:</strong> {{ articles[0].category }}</p>
          <p><strong>Publication Date:</strong> {{ formatDate(articles[0].publicationDate) }}</p>
        </div>
      </div>

      <div class="secondary-articles">
        <div v-for="(article) in articles.slice(1)" :key="article._id" class="secondary-article">
          <div class="article-image-container">
            <img v-if="article.media && article.media.length > 0" 
                 :src="article.media[0]" 
                 alt="Article image" 
                 class="secondary-article-image" />
          </div>
          <div class="article-content">
            <h3>{{ article.title }}</h3>
            <p><strong>Summary:</strong> {{ article.summary }}</p>
            <p><strong>Category:</strong> {{ article.category }}</p>
            <p><strong>Publication Date:</strong> {{ formatDate(article.publicationDate) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewsView',
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
        const response = await axios.get('http://10.110.48.248:5001/api/articles');
        this.articles = response.data;
      } catch (err) {
        this.error = 'Failed to load articles. Please try again later.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      return dateString ? new Date(dateString).toLocaleDateString() : "Unknown date";
    }
  },
};
</script>




<style scoped>
.news-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  

  color: #fff; /* Weißer Text */

}

/* Lade- und Fehleranzeige */
.loading,
.error {
  font-size: 16px;
  color: #aaa; /* Grauer Text */
}

.error button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #ff5733; /* Auffällige Fehlerfarbe */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Hauptartikel */
.main-article {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #1e1e1e; /* Abgesetzter Hintergrund */
  border-radius: 10px;
  overflow: hidden;
  padding: 20px;
}

.main-article-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

.article-content h2 {
  font-size: 24px;
  margin: 0;
}

/* Sekundäre Artikel */
.secondary-articles {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Zweier-Gruppen */
  gap: 20px;
}

.secondary-article {
  background-color: #1e1e1e;
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.secondary-article-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.article-content h3 {
  font-size: 18px;
  margin: 0;
}

.article-content p {
  font-size: 14px;
  color: #aaa;
  margin: 5px 0;
}
</style>
