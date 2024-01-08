import { getCollection, type CollectionEntry } from "astro:content";

class BlogCollection {
  private posts: CollectionEntry<"blog">[] = [];

  public async getCollection() {
    this.posts = await getCollection("blog", ({ data }) => {
      return !data.draft && data.pubDatetime <= new Date();
    });
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

  public getPage(number: number, postsPerPage: number = 5) {
    if (number < 1 || postsPerPage < 1) return [];
    const firstPostIndex = (number - 1) * postsPerPage;
    const lastPostIndex = firstPostIndex + postsPerPage - 1;

    if (firstPostIndex >= this.posts.length) return [];

    return this.posts.slice(
      firstPostIndex,
      Math.min(lastPostIndex + 1, this.posts.length)
    );
  }

  public lastPage(postsPerPage: number = 5): number {
    if (postsPerPage < 1) return 1;
    return Math.floor((this.posts.length - 1) / postsPerPage) + 1;
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
