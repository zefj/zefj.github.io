import postFilter from "./postFilter";
import type { Post } from "types";

const getSortedPosts = (posts: Post[]) => {
  return posts
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.updatedAt ?? b.data.publishedAt).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.updatedAt ?? a.data.publishedAt).getTime() / 1000
        )
    );
};

export default getSortedPosts;
