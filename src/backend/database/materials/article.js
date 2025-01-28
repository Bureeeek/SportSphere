// Author Class Definition
class Author {
  constructor(
    username = "Unknown",
    firstname = "Unknown",
    lastname = "Unknown",
    verified = false,
    email = "No Email"
  ) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.verified = verified;
    this.email = email;
  }
}

// Media Class Definition
class Media {
  constructor(type = "Unknown", url = "#", caption = "No Caption") {
    this.type = type;
    this.url = url;
    this.caption = caption;
  }
}

// Article Class Definition
class Article {
  constructor(
    title = "Untitled",
    author = new Author(),
    publicationDate = new Date().toISOString(),
    lastUpdated = new Date().toISOString(),
    category = "General",
    tags = [],
    summary = "No summary available.",
    content = { body: "No content available.", media: [] },
    commentsEnabled = false,
    readTime = 0
  ) {
    this.title = title;
    this.author = author;
    this.publicationDate = new Date(publicationDate);
    this.lastUpdated = new Date(lastUpdated);
    this.category = category;
    this.tags = Array.isArray(tags) ? tags : []; // Ensure it's an array
    this.summary = summary;
    this.content = {
      body: content.body || "No content available.",
      media: Array.isArray(content.media) ? content.media : [],
    };
    this.commentsEnabled = commentsEnabled;
    this.readTime = Math.max(0, readTime); // Ensure non-negative read time
  }

  // Method to render article details in the console
  render() {
    console.log("\n========== ARTICLE ==========");
    console.log(`Title: ${this.title}`);
    console.log(
      `Author: ${this.author.firstname} ${this.author.lastname} (@${this.author.username})`
    );
    console.log(`Verified: ${this.author.verified ? "Yes" : "No"}`);
    console.log(`Email: ${this.author.email}`);
    console.log(`Published: ${this.publicationDate.toLocaleString()}`);
    console.log(`Last Updated: ${this.lastUpdated.toLocaleString()}`);
    console.log(`Category: ${this.category}`);
    console.log(
      `Tags: ${this.tags.length > 0 ? this.tags.join(", ") : "No tags"}`
    );
    console.log(`Summary: ${this.summary}`);
    console.log(`Read Time: ${this.readTime} minutes`);
    console.log(`Comments Enabled: ${this.commentsEnabled ? "Yes" : "No"}`);
    console.log("\n--- Content ---");
    console.log(this.content.body);

    if (this.content.media.length > 0) {
      console.log("\n--- Media ---");
      this.content.media.forEach((media, index) => {
        console.log(`${index + 1}. [${media.type.toUpperCase()}] ${media.url}`);
        console.log(`   Caption: ${media.caption}`);
      });
    } else {
      console.log("\nNo media available.");
    }

    console.log("=============================\n");
  }
}

// Example Usage with Default Values
const author = new Author("john_doe", "John", "Doe", true, "john@example.com");

const content = {
  body: "This is the body of the article.",
  media: [
    new Media("image", "https://example.com/image.jpg", "An example image."),
    new Media("video", "https://example.com/video.mp4", "An example video."),
  ],
};

const article = new Article(
  "Sample Article",
  author,
  "2024-01-28T12:00:00Z",
  "2024-01-28T15:00:00Z",
  "Technology",
  ["Tech", "Innovation"],
  "This is a summary of the article.",
  content,
  true,
  5
);

article.render();
