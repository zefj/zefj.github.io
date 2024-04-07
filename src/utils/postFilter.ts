import { SITE } from "@config";
import type { Post } from "types";

const postFilter = ({ data }: Post) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.publishedAt).getTime() - SITE.scheduledPostMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;
