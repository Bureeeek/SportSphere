// Article Class Definition
class Author {
    constructor(username, firstname, lastname, verified, email) {
      this.username = username;
      this.firstname = firstname;
      this.lastname = lastname;
      this.verified = verified;
      this.email = email;
    }
  }
  
  class Media {
    constructor(type, url, caption) {
      this.type = type;
      this.url = url;
      this.caption = caption;
    }
  }
  
  class Article {
    constructor(title, author, publicationDate, lastUpdated, category, tags, summary, content, commentsEnabled, readTime) {
      this.title = title;
      this.author = author;
      this.publicationDate = publicationDate;
      this.lastUpdated = lastUpdated;
      this.category = category;
      this.tags = tags;
      this.summary = summary;
      this.content = content;
      this.commentsEnabled = commentsEnabled;
      this.readTime = readTime;
    }
  
    // Method to render article details in the console
    render() {
      console.log(`Title: ${this.title}`);
      console.log(`Author: ${this.author.firstname} ${this.author.lastname} (${this.author.username})`);
      console.log(`Verified: ${this.author.verified ? "Yes" : "No"}`);
      console.log(`Email: ${this.author.email}`);
      console.log(`Published: ${new Date(this.publicationDate).toLocaleString()}`);
      console.log(`Last Updated: ${new Date(this.lastUpdated).toLocaleString()}`);
      console.log(`Category: ${this.category}`);
      console.log(`Tags: ${this.tags.join(", ")}`);
      console.log(`Summary: ${this.summary}`);
      console.log(`Read Time: ${this.readTime} minutes`);
      console.log(`Comments Enabled: ${this.commentsEnabled ? "Yes" : "No"}`);
      console.log(`\n--- Content ---`);
      console.log(this.content.body);
      console.log(`\n--- Media ---`);
      this.content.media.forEach((media, index) => {
        console.log(`${index + 1}. [${media.type.toUpperCase()}] ${media.url}`);
        console.log(`   Caption: ${media.caption}`);
      });
    }
  }
  
  // Example Usage with Empty Data (Constructor)
  const author = new Author(
    "", // username
    "", // firstname
    "", // lastname
    false, // verified
    "" // email
  );
  
  const content = {
    body: "", // Body of the article
    media: [
      new Media("", "", ""), // image/media placeholder
      new Media("", "", "") // video/media placeholder
    ]
  };
  
  const article = new Article(
    "", // title
    author,
    "", // publicationDate
    "", // lastUpdated
    "", // category
    [], // tags
    "", // summary
    content,
    false, // commentsEnabled
    0 // readTime
  );
  
article.render();
  