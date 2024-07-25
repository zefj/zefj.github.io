import PublishDate from "@components/PublishDate";
import Tag from "@components/Tag";
import type { Post } from "types";

type Props = {
  post: Post;
  size?: "sm" | "lg";
};

export default function PostMetadata({ post, size }: Props) {
  const { tags } = post.data;

  return (
    <div className="flex flex-wrap items-center">
      <PublishDate post={post} size={size} dividerAfter />

      <div className="flex gap-1">
        {tags.map(tag => {
          return <Tag key={tag} tag={tag} size={size} />;
        })}
      </div>
    </div>
  );
}
