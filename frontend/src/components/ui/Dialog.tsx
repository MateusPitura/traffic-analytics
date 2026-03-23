import * as DialogRadix from "@radix-ui/react-dialog";
import { ReactNode } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  children,
}: DialogProps): ReactNode {
  return (
    <DialogRadix.Root open={isOpen} onOpenChange={onClose}>
      <DialogRadix.DialogPortal>
        <DialogRadix.DialogOverlay className="fixed inset-0 bg-black/25 z-20" />
        <DialogRadix.DialogContent className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-125 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-4 focus:outline-none bg-surface-bright z-30 flex flex-col gap-4">
          <DialogRadix.DialogTitle className="m-0 text-lg font-medium text-on-surface">
            {title}
          </DialogRadix.DialogTitle>
          <DialogRadix.DialogDescription className="hidden" />
          {children}
        </DialogRadix.DialogContent>
      </DialogRadix.DialogPortal>
    </DialogRadix.Root>
  );
}
