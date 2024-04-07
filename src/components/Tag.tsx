export interface Props {
  tag: string;
  size?: "sm" | "lg";
  withTransition?: boolean;
}

export default function Tag({
  tag,
  size = "sm",
  withTransition = false,
}: Props) {
  return (
    <a
      href={`/tags/${tag}/`}
      style={
        withTransition
          ? {
              // @ts-expect-error
              "view-transition-name": tag,
            }
          : {}
      }
      class={`${size === "sm" ? "text-sm" : "text-base"} group relative whitespace-nowrap pr-2 underline underline-offset-4 hover:text-skin-accent focus-visible:p-1`}
    >
      <span>#{tag}</span>
    </a>
  );
}
