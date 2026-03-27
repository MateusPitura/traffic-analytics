import {
  ScrollArea,
  Scrollbar,
  Thumb,
  Viewport,
} from "@radix-ui/react-scroll-area";
import { ClassValue } from "clsx";
import { type ReactNode } from "react";
import { ChildrenProps } from "../../../types";
import { cn } from "../../../utils/cn";

function Container({ children }: ChildrenProps): ReactNode {
  return (
    <ScrollArea className="border border-outline overflow-hidden h-full rounded-lg has-data-table-bottom:[&>.target]:pb-11.75">
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
    <Viewport
      className={cn("w-full h-full *:h-full target", className)}
      id="table-container"
    >
      <table className="w-full has-data-table-empty:h-full">{children}</table>
    </Viewport>
  );
}

function Header({ children }: ChildrenProps): ReactNode {
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
    <div
      data-table-bottom
      className="min-h-12 px-2 flex gap-4 text-on-surface items-center z-20 sticky bottom-0 bg-surface border-t border-outline"
    >
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
  return (
    <th
      className={cn(
        "text-on-surface font-semibold text-sm h-12 px-2 text-start whitespace-nowrap relative",
        "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-outline",
        !!sticky &&
          "sticky z-10 bg-surface before:content-[''] before:absolute before:top-0 before:bottom-0 before:right-0 before:w-0 before:bg-outline table-sticky-border",
        sticky === "left" && "before:right-0 left-0",
        sticky === "right" && "before:left-0 right-0",
        className
      )}
    >
      {children}
      {sticky === "left" && (
        <div className="absolute top-0 -right-2 h-full w-2 bg-linear-to-r from-black/75 to-transparent" />
      )}
    </th>
  );
}

interface CellProps {
  children?: ReactNode;
  className?: ClassValue;
  sticky?: "left" | "right";
}

function Cell({ children, className, sticky }: CellProps): ReactNode {
  return (
    <td
      className={cn(
        "whitespace-nowrap text-on-surface text-sm px-2 text-start group-hover:bg-surface-bright relative",
        !!sticky &&
          "sticky z-10 bg-surface before:content-[''] before:absolute before:top-0 before:bottom-0 before:bg-outline table-sticky-border",
        sticky === "left" && "before:right-0 left-0",
        sticky === "right" && "before:left-0 right-0",
        className
      )}
    >
      <div className={cn("h-12 max-h-12 flex items-center")}>{children}</div>
      {sticky === "left" && (
        <div className="absolute top-0 -right-2 h-full w-2 bg-linear-to-r from-black/75 to-transparent" />
      )}
    </td>
  );
}

interface FootProps {
  children?: ReactNode;
}

function Foot({ children }: FootProps): ReactNode {
  return (
    <Cell className="after:content-[''] after:absolute after:left-0 after:right-0 after:-top-px after:h-0.5 after:border-outline after:border-t after:bg-surface">
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
