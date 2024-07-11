import {
  Tooltip as TooltipBase,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import type { ReactNode } from "react";

type Props = { children: ReactNode; content: ReactNode };

export const Tooltip = ({ children, content }: Props) => {
  return (
    <TooltipProvider delayDuration={0}>
      <TooltipBase>
        <TooltipTrigger className="cursor-help underline decoration-dashed underline-offset-4 hover:text-skin-accent">
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-64">{content}</TooltipContent>
      </TooltipBase>
    </TooltipProvider>
  );
};
