import { createContext } from "react";

interface TableProps {
  columnsCount: number;
  setColumnCount: (_: number) => void;
}

const TableContext = createContext<TableProps | null>(null);

export { TableContext };
