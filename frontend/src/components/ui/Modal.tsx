import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle
} from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps): ReactNode {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/25 z-20" />
        <DialogContent className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-125 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-4 focus:outline-none bg-surface-bright z-30 flex flex-col gap-4">
          <DialogTitle className="m-0 text-lg font-medium text-on-surface">
            {title}
          </DialogTitle>
          <DialogDescription className="hidden" />
          {children}
          <div className="flex justify-end">
            <Button label="Save" onClick={onClose}/>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
