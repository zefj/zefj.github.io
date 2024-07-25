import { LOCALE } from "@config";
import type { Post } from "types";

type Props = {
  post: Post;
  size?: "sm" | "lg";
  dividerAfter?: boolean;
};

export default function PublishDate({
  post,
  size = "sm",
  dividerAfter = false,
}: Props) {
  const { publishedAt, updatedAt, exactPublishedAtUnknown } = post.data;

  return (
    <span className={`${size === "sm" ? "text-sm" : "text-base"}`}>
      <span className="sr-only">Published:</span>

      <FormattedDate
        datetime={publishedAt}
        exactUnknown={exactPublishedAtUnknown}
      />

      {updatedAt && (
        <>
          <span className="mx-1">•</span>
          <span className="mr-1 font-semibold">Updated:</span>
          <FormattedDate datetime={updatedAt} />
        </>
      )}

      {dividerAfter && <span className="mx-1">•</span>}
    </span>
  );
}

type FrontmatterDateProps = {
  datetime: Date;
  exactUnknown?: boolean;
};

const FormattedDate = ({ datetime, exactUnknown }: FrontmatterDateProps) => {
  const isoDatetime = datetime.toISOString();

  if (exactUnknown) {
    return (
      <>
        <time dateTime={isoDatetime} title={isoDatetime}>
          Sometime in {datetime.getFullYear()}
        </time>
      </>
    );
  }

  const formattedDate = datetime.toLocaleDateString(LOCALE.langTag, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <time dateTime={isoDatetime} title={isoDatetime}>
      {formattedDate}
    </time>
  );
};
