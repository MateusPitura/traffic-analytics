import { useState } from "react";

interface UseTableCheckboxProperties {
    payload: string[]
}

interface UseTableCheckboxReturn {
    toggleAll: () => void;
    toggleRow: (id: string) => void;
    clearSelection: () => void;
    allSelected: boolean;
    isIndeterminate: boolean;
    selected: Set<string>;
}

export function useTableCheckbox({
    payload
}: UseTableCheckboxProperties): UseTableCheckboxReturn {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggleAll() {
    if (selected.size === payload.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(payload));
    }
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function clearSelection() {
    setSelected(new Set());
  }

  const allSelected = selected.size === payload.length;
  const isIndeterminate = selected.size > 0 && selected.size < payload.length;

  return {
    toggleAll,
    toggleRow,
    allSelected,
    isIndeterminate,
    selected,
    clearSelection,
  }
}