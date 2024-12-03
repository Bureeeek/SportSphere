export default {
  data() {
    return {
      news: {
        title: "",
        summary: "",
        category: "",
        tags: "",
        content: "",
        media: [],
      },
    };
  },
  methods: {
    handleMediaUpload(event) {
      const files = event.target.files;
      this.news.media = Array.from(files).map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));
    },
    submitForm() {
      // Dummy-Datenstruktur zum Anzeigen
      console.log("Artikel gesendet:", this.news);
      // Hier könnten wir später die API-Aufrufe machen
      alert("Artikel erfolgreich erstellt!");

      // Später machen wir das mit dem Autor. Damit meine ich das wenn wir ein News erstellen, dass der Autor automatisch angezeigt wird.
    },
  },
};
