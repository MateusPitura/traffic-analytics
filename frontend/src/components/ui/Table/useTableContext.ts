import { useContext } from "react";
import { TableContext } from "./TableContext";

export default function useTableContext() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }

  return context;
}
