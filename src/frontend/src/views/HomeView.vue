<template>
  <div class="news-page">
    <h1>News Articles</h1>

    <div v-if="loading" class="loading">Loading articles...</div>

    <div v-else-if="error" class="error">
      Error: {{ error }} 
      <button @click="fetchArticles()">Reload</button>
    </div>

    <div v-else>
      <!-- Hauptartikel klickbar machen -->
      <div v-if="articles.length > 0" class="main-article" @click="goToArticle(articles[0]._id)">
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

      <!-- Kleinere Artikel klickbar machen -->
      <div class="secondary-articles">
        <div v-for="(article) in articles.slice(1)" :key="article._id" 
             class="secondary-article" 
             @click="goToArticle(article._id)">
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
        const response = await axios.get('http://localhost:5001/api/articles');
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
    },
    goToArticle(id) {
      this.$router.push({ name: "news-detail", params: { id } });
    }
  },
};
</script>



<style scoped>
.news-page {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
  color: var(--text-color);
  background-color: var(--background-color);
}

/* Hauptartikel */
.main-article {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 350px;
  background-color: var(--sidebar-bg);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 40px;
}

.main-article-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}

/* Hauptartikel - Text */
.article-content {
  position: relative;
  z-index: 2;
  color: #fff;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
}

.article-content h2 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 8px;
}

.article-content p {
  font-size: 14px;
  font-weight: 500;
  opacity: 0.9;
}

.article-content strong {
  color: #58a6ff; /* Blaue Hervorhebung für wichtige Texte */
}

/* Sekundäre Artikel */
.secondary-articles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.secondary-article {
  position: relative;
  height: 140px;
  background-color: var(--sidebar-bg);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 15px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.secondary-article:hover {
  transform: translateY(-3px);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
}

/* Sekundäre Artikel - Bild */
.secondary-article-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8);
}

/* Sekundäre Artikel - Text */
.secondary-article .article-content {
  position: relative;
  z-index: 2;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding-left: 10px;
}

.secondary-article h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
}

.secondary-article p {
  font-size: 14px;
  font-weight: 500;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-article {
    height: 250px;
  }

  .secondary-articles {
    grid-template-columns: 1fr;
  }
}

</style>
