import { ReactNode, useMemo, useState } from "react";
import { TableContext } from "./TableContext";

interface TableProviderProps {
  children: ReactNode;
}

function TableProvider({ children }: TableProviderProps) {
  const [columnsCount, setColumnCount] = useState(0);

  const values = useMemo(() => {
    return {
      columnsCount,
      setColumnCount,
    };
  }, [columnsCount]);

  return (
    <TableContext.Provider value={values}>{children}</TableContext.Provider>
  );
}

export { TableProvider };
