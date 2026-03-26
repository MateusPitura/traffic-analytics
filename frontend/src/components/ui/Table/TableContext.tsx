import { createContext } from "react";

interface TableProps {
  hasHorizontalScroll: boolean;
  setHasHorizontalScroll: (_: boolean) => void;
}

const TableContext = createContext<TableProps | null>(null);

export { TableContext };
