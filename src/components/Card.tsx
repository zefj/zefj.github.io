import { slugifyStr } from "@utils/slugify";
import PostMetadata from "@components/PostMetadata";
import type { Post } from "types";

export interface Props {
  href?: string;
  post: Post;
  secHeading?: boolean;
}

export default function Card({ href, post, secHeading = true }: Props) {
  const { title, tags, description } = post.data;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>

      <PostMetadata post={post} />

      <p>{description}</p>
    </li>
  );
}
