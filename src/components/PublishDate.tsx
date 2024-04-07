import { LOCALE } from "@config";
import type { CollectionEntry } from "astro:content";

type Props = {
  frontmatter: CollectionEntry<"blog">["data"];
  size?: "sm" | "lg";
};

export default function PublishDate({ frontmatter, size = "sm" }: Props) {
  const { publishedAt, updatedAt, exactPublishedAtUnknown } = frontmatter;

  return (
    <div className="flex items-center space-x-2 opacity-80">
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
      </span>
    </div>
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
