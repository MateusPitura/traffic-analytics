import {
  ScrollArea,
  Scrollbar,
  Thumb,
  Viewport,
} from "@radix-ui/react-scroll-area";
import { ClassValue } from "clsx";
import { useEffect, type ReactNode } from "react";
import { ChildrenProps } from "../../../types";
import { cn } from "../../../utils/cn";
import { TableProvider } from "./TableProvider";
import useTableContext from "./useTableContext";

function Container({ children }: ChildrenProps): ReactNode {
  return (
    <ScrollArea className="border border-outline overflow-hidden h-full rounded-lg">
      {children}
      <Scrollbar
        orientation="vertical"
        className="right-0 top-0 bottom-0 w-0.5 bg-transparent z-10 pt-12 pb-12"
      >
        <Thumb className="bg-neutral-500 rounded-full w-full" />
      </Scrollbar>

      <Scrollbar
        orientation="horizontal"
        className="bottom-0 left-0 right-0 h-0.5 bg-transparent z-20"
      >
        <Thumb className="bg-neutral-500 rounded-full h-full!" />
      </Scrollbar>
    </ScrollArea>
  );
}

interface RootProps {
  children: ReactNode;
  className?: ClassValue;
}

function Root({ children, className }: RootProps): ReactNode {
  return (
    <TableProvider>
      <Viewport
        className={cn("w-full h-full *:h-full pb-[47px]", className)}
        id="table-container"
      >
        <table className="w-full has-[&_[data-table-empty=true]]:h-full">
          {children}
        </table>
      </Viewport>
    </TableProvider>
  );
}

function Header({ children }: ChildrenProps): ReactNode {
  const { setHasHorizontalScroll } = useTableContext();

  useEffect(() => {
    const element = document.getElementById("table-container");
    if (element) {
      setHasHorizontalScroll(element.scrollWidth > element.clientWidth);
    }
  }, [children, setHasHorizontalScroll]);

  return (
    <thead className="sticky top-0 z-20 bg-surface">
      <Table.Row className="border-none">{children}</Table.Row>
    </thead>
  );
}

function Body({ children }: ChildrenProps): ReactNode {
  return <tbody className="min-h-full">{children}</tbody>;
}

function Footer({ children }: ChildrenProps): ReactNode {
  return (
    <tfoot className="sticky bottom-0 z-20 bg-surface">
      <Table.Row>{children}</Table.Row>
    </tfoot>
  );
}

function Bottom({ children }: ChildrenProps): ReactNode {
  return (
    <div className="min-h-12 px-2 flex gap-4 text-on-surface items-center z-20 sticky bottom-0 bg-surface border-t border-outline">
      {children}
    </div>
  );
}

interface HeadProps {
  children?: ReactNode;
  className?: ClassValue;
  sticky?: "left" | "right";
}

function Head({ children, className, sticky }: HeadProps): ReactNode {
  const { hasHorizontalScroll } = useTableContext();

  return (
    <th
      className={cn(
        "text-on-surface font-semibold text-sm h-12 px-2 text-start whitespace-nowrap",
        "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-outline",
        !!sticky &&
          hasHorizontalScroll &&
          "sticky z-10 bg-surface before:content-[''] before:absolute before:top-0 before:bottom-0 before:right-0 before:w-px before:bg-outline",
        sticky === "left" && hasHorizontalScroll && "before:right-0 left-0",
        sticky === "right" && hasHorizontalScroll && "before:left-0 right-0",
        className
      )}
    >
      {children}
    </th>
  );
}

interface CellProps {
  children?: ReactNode;
  className?: ClassValue;
  sticky?: "left" | "right";
}

function Cell({ children, className, sticky }: CellProps): ReactNode {
  const { hasHorizontalScroll } = useTableContext();

  return (
    <td
      className={cn(
        "whitespace-nowrap text-on-surface text-sm px-2 text-start group-hover:bg-surface-bright",
        !!sticky &&
          hasHorizontalScroll &&
          "sticky z-10 bg-surface before:content-[''] before:absolute before:top-0 before:bottom-0 before:w-px before:bg-outline",
        sticky === "left" && hasHorizontalScroll && "before:right-0 left-0",
        sticky === "right" && hasHorizontalScroll && "before:left-0 right-0",
        className
      )}
    >
      <div className={cn("h-12 max-h-12 flex items-center")}>{children}</div>
    </td>
  );
}

interface FootProps {
  children?: ReactNode;
  sticky?: "left" | "right";
}

function Foot({ children, sticky }: FootProps): ReactNode {
  return (
    <Cell
      className="after:content-[''] after:absolute after:left-0 after:right-0 after:-top-px after:h-0.5 after:border-outline after:border-t after:bg-surface"
      sticky={sticky}
    >
      {children}
    </Cell>
  );
}

interface RowProps {
  children: ReactNode;
  className?: ClassValue;
  onClick?: () => void;
}

function Row({ children, className, onClick }: RowProps): ReactNode {
  return (
    <tr
      className={cn("border-b border-outline group bg-surface", className)}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

interface EmptyProps {
  children: ReactNode;
  className?: string;
}

function Empty({ children, className }: EmptyProps) {
  return (
    <Table.Row className="border-none">
      <td colSpan={100}>
        <div data-table-empty className={className}>
          {children}
        </div>
      </td>
    </Table.Row>
  );
}

interface AccordionProps {
  children: ReactNode;
  className?: ClassValue;
}

function Accordion({ children, className }: AccordionProps): ReactNode {
  return (
    <Table.Row>
      <td
        colSpan={100}
        className={cn("text-sm text-on-surface px-2", className)}
      >
        {children}
      </td>
    </Table.Row>
  );
}

const Table = Object.assign(Root, {
  Container,
  Header,
  Body,
  Footer,
  Bottom,
  Head,
  Cell,
  Foot,
  Row,
  Empty,
  Accordion,
});

export { Table };
