<template>
  <div class="create-view">
    <h1>Erstelle deinen Sportartikel</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Titel</label>
        <input
          type="text"
          id="title"
          v-model="news.title"
          placeholder="Titel eingeben"
          required
        />
      </div>

      <div class="form-group">
        <label for="summary">Zusammenfassung</label>
        <textarea
          id="summary"
          v-model="news.summary"
          placeholder="Zusammenfassung eingeben"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="category">Kategorie</label>
        <select id="category" v-model="news.category" required>
          <option disabled value="">Kategorie wählen</option>
          <option>Fußball</option>
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
          placeholder="Tags durch Kommas trennen"
        />
      </div>

      <div class="form-group">
        <label for="content">Inhalt</label>
        <textarea
          id="content"
          v-model="news.content"
          placeholder="Inhalt eingeben"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="media">Medien (Bilder/Videos)</label>
        <input type="file" id="media" multiple @change="handleMediaUpload" />
      </div>

      <button type="submit">Artikel erstellen</button>
    </form>
  </div>
</template>

<script src="../js/CreateView.js"></script>
<style scoped src="../css/CreateView.css"></style>

