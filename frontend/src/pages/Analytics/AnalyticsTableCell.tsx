import type { ReactNode } from "react";
import { Table } from "../../components/ui/Table";
import { Tooltip } from "../../components/ui/Tooltip";

interface AnalyticsTableCellProperties {
  tooltip: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AnalyticsTableCell({
  children,
  tooltip,
  className
}: AnalyticsTableCellProperties): ReactNode {
  return (
    <Table.Cell className={className}>
      <Tooltip content={tooltip} disabled={!tooltip}>
        {children}
      </Tooltip>
    </Table.Cell>
  );
}
