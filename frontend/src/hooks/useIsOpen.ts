import { useCallback, useState } from "react";

interface UseIsOpenResponse {
    isOpen: boolean;
    handle: (_: boolean) => void;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export function useIsOpen(): UseIsOpenResponse {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handle = useCallback((state: boolean) => {
    setIsOpen(state);
  }, []);

  return { isOpen, handle, open, close, toggle };
}
