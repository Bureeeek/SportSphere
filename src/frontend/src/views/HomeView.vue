<template>
  <div class="news-page">
    <h1>News Articles</h1>

    <!-- Ladeanzeige -->
    <div v-if="loading" class="loading">Loading articles...</div>
    
    <!-- Fehleranzeige -->
    <div v-else-if="error" class="error">
      Error: {{ error }} 
      <button @click="fetchArticles()">Reload</button>
    </div>

    <!-- Hauptartikel und andere Artikel -->
    <div v-else>
      <div v-if="articles.length > 0" class="main-article">
        <div class="article-image-container">
          <img :src="articles[0].imageUrl" alt="Main Article image" class="main-article-image" />
        </div>
        <div class="article-content">
          <h2>{{ articles[0].title }}</h2>
          <p><strong>Summary:</strong> {{ articles[0].summary }}</p>
          <p><strong>Category:</strong> {{ articles[0].category }}</p>
          <p><strong>Tags:</strong> {{ articles[0].tags ? articles[0].tags.join(', ') : 'No tags available' }}</p>
          <p><strong>Publication Date:</strong> {{ new Date(articles[0].publicationDate).toLocaleDateString() }}</p>
        </div>
      </div>

      <div class="secondary-articles">
        <div 
          v-for="article in articles.slice(1)" 
          :key="article._id" 
          class="secondary-article" 
        >
          <div class="article-image-container">
            <img :src="article.imageUrl" alt="Article image" class="secondary-article-image" />
          </div>
          <div class="article-content">
            <h3>{{ article.title }}</h3>
            <p><strong>Summary:</strong> {{ article.summary }}</p>
            <p><strong>Category:</strong> {{ article.category }}</p>
            <p><strong>Publication Date:</strong> {{ new Date(article.publicationDate).toLocaleDateString() }}</p>
          </div>
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
        // Prüfe die Antwort vom Server
        console.log(response.data);
        this.articles = response.data.map(article => ({
          ...article,
          // Stelle sicher, dass imageUrl korrekt gesetzt wird
          imageUrl: article.media.length > 0 ? `http://localhost:5000/api/media/${article.media[0]}` : '', // Erste Media als Bild-URL
        }));
      } catch (err) {
        this.error = 'Failed to load articles. Please try again later.';
        console.error(err);
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
  color: var(--text-color);
}

.loading, .error {
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

.main-article {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #1e1e1e;
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

.secondary-articles {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
