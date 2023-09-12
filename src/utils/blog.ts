import { getCollection, type CollectionEntry } from "astro:content";

class BlogCollection {
  private posts: CollectionEntry<"blog">[] = [];

  public async getCollection() {
    this.posts = await getCollection("blog");
    this.filterHiddenPosts();
    this.sortByDate();
  }

  public getPosts() {
    return this.posts;
  }

  private sortByDate() {
    this.posts.sort((a, b) => {
      return (
        new Date(b.data.pubDatetime).getTime() -
        new Date(a.data.pubDatetime).getTime()
      );
    });
  }

  private filterHiddenPosts() {
    this.posts = this.posts.filter(
      post => !post.data.draft && post.data.pubDatetime <= new Date()
    );
  }

  public getRecentPosts(number: number) {
    return this.posts.slice(0, number);
  }

  public getFeaturedPosts() {
    return this.posts.filter(post => post.data.featured);
  }

  public getPostsByTags(tags: string[]) {
    return this.posts.filter(post =>
      tags.every(tag => post.data.tags.includes(tag))
    );
  }
}

export default BlogCollection;
