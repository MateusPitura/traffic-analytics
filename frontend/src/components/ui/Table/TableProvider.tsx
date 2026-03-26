import { ReactNode, useMemo, useState } from "react";
import { TableContext } from "./TableContext";

interface TableProviderProps {
  children: ReactNode;
}

function TableProvider({ children }: TableProviderProps) {
  const [columnsCount, setColumnCount] = useState(0);
  const [hasHorizontalScroll, setHasHorizontalScroll] = useState(false);

  const values = useMemo(() => {
    return {
      columnsCount,
      setColumnCount,
      hasHorizontalScroll,
      setHasHorizontalScroll,
    };
  }, [columnsCount, hasHorizontalScroll]);

  return (
    <TableContext.Provider value={values}>{children}</TableContext.Provider>
  );
}

export { TableProvider };
