import { createContext } from "react";

interface TableProps {
  columnsCount: number;
  setColumnCount: (_: number) => void;
  hasHorizontalScroll: boolean;
  setHasHorizontalScroll: (_: boolean) => void;
}

const TableContext = createContext<TableProps | null>(null);

export { TableContext };
