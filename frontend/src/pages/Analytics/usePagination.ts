import { useState } from "react";

interface UsePaginationProps {
  setFilters: (filters: { cursor?: string }) => void;
}

interface UsePaginationReturn {
  cursorStack: string[];
  handleNext: (nextCursor: string) => void;
  handlePrevious: () => void;
}

export function usePagination({
  setFilters,
}: UsePaginationProps): UsePaginationReturn {
  const [cursorStack, setCursorStack] = useState<string[]>([]);

  function handleNext(nextCursor: string) {
    setCursorStack((prev) => [...prev, nextCursor]);

    setFilters({
      cursor: nextCursor,
    });
  }

  function handlePrevious() {
    setCursorStack((prev) => {
      const newStack = [...prev];
      newStack.pop();

      const previousCursor = newStack[newStack.length - 1];

      setFilters({
        cursor: previousCursor,
      });

      return newStack;
    });
  }

  return {
    cursorStack,
    handleNext,
    handlePrevious,
  };
}
