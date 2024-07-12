import {
  Tooltip as TooltipComponent,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { useDetectMobileBrowser } from "@utils/isMobileBrowser";
import { useState, type ReactNode } from "react";

type Props = { children: ReactNode; content: ReactNode };

// Radix tooltips don't work on mobile. That is by design, the recommendation
// is to use Popover but I disagree with the complexity and bundle size it
// would add, so I'm doing this hack.
//
// This works good enough on an iPhone, but not so well in the browser device
// simulation mode. This is because Radix listens to `onClick` and closes the
// Tooltip.
// TODO: Need to check tablets with pencil.
const MobileTooltip = ({ children, content }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <TooltipComponent open={open} onOpenChange={open => setOpen(open)}>
      <TooltipTrigger
        className="cursor-help underline decoration-dashed decoration-2 underline-offset-4 hover:text-skin-accent"
        onClick={() => setOpen(!open)}
      >
        <span>{children}</span>
      </TooltipTrigger>
      <TooltipContent className="max-w-64">{content}</TooltipContent>
    </TooltipComponent>
  );
};

const DesktopTooltip = ({ children, content }: Props) => {
  return (
    <TooltipComponent>
      <TooltipTrigger className="cursor-help underline decoration-dashed decoration-2 underline-offset-4 hover:text-skin-accent">
        <span>{children}</span>
      </TooltipTrigger>
      <TooltipContent className="max-w-64">{content}</TooltipContent>
    </TooltipComponent>
  );
};

export const Tooltip = ({ children, content }: Props) => {
  const isMobile = useDetectMobileBrowser();
  const TooltipBase = isMobile ? MobileTooltip : DesktopTooltip;

  return (
    <TooltipProvider delayDuration={0}>
      <TooltipBase content={content}>{children}</TooltipBase>
    </TooltipProvider>
  );
};
