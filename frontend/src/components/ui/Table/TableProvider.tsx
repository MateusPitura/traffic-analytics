import { ReactNode, useMemo, useState } from "react";
import { TableContext } from "./TableContext";

interface TableProviderProps {
  children: ReactNode;
}

function TableProvider({ children }: TableProviderProps) {
  const [hasHorizontalScroll, setHasHorizontalScroll] = useState(false);

  const values = useMemo(() => {
    return {
      hasHorizontalScroll,
      setHasHorizontalScroll,
    };
  }, [hasHorizontalScroll]);

  return (
    <TableContext.Provider value={values}>{children}</TableContext.Provider>
  );
}

export { TableProvider };
