import getSortedPosts from "./getSortedPosts";
import { slugifyAll } from "./slugify";
import type { Post } from "types";

const getPostsByTag = (posts: Post[], tag: string) =>
  getSortedPosts(
    posts.filter(post => slugifyAll(post.data.tags).includes(tag))
  );

export default getPostsByTag;
