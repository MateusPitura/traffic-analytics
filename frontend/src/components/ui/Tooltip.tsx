import * as RadixTooltip from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

interface TooltipProperties {
  children?: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export function Tooltip({
  content,
  children,
  disabled,
}: TooltipProperties): ReactNode {
  if (disabled) return children;

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={0} disableHoverableContent>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="select-none rounded-md bg-surface-variant py-1 px-2 text-sm text-on-surface-variant shadow-lg z-40"
            sideOffset={5}
            side="bottom"
          >
            {content}
            <RadixTooltip.Arrow className="fill-surface-variant" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
