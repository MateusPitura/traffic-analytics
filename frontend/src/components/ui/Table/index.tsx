import { cva, VariantProps } from "class-variance-authority";
import { ClassValue } from "clsx";
import { Children, useEffect, type ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { TableProvider } from "./TableProvider";
import useTableContext from "./useTableContext";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps): ReactNode {
  return (
    <TableProvider>
      <div className="overflow-auto w-full h-full" id="table-container">
        <table className="w-full has-[&_[data-empty=true]]:h-full">
          {children}
        </table>
      </div>
    </TableProvider>
  );
}

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps): ReactNode {
  const { setColumnCount, setHasHorizontalScroll } = useTableContext();

  useEffect(() => {
    setColumnCount(Children.count(children));
    const element = document.getElementById("table-container");
    if (element) {
      setHasHorizontalScroll(element.scrollWidth > element.clientWidth);
    }
  }, [children, setColumnCount, setHasHorizontalScroll]);

  return (
    <thead className="sticky top-0 z-20 bg-surface">
      <Table.Row>{children}</Table.Row>
    </thead>
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
        sticky === "left" &&
          hasHorizontalScroll &&
          "sticky left-0 z-10 bg-surface before:content-[''] before:absolute before:top-0 before:bottom-0 before:right-0 before:w-px before:bg-outline",
        sticky === "right" &&
          hasHorizontalScroll &&
          "sticky right-0 z-10 bg-surface before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:w-px before:bg-outline",
        className
      )}
    >
      {children}
    </th>
  );
}

interface BodyProps {
  children: ReactNode;
}

function Body({ children }: BodyProps): ReactNode {
  return <tbody className="min-h-full">{children}</tbody>;
}

interface CellProps {
  children: ReactNode;
  className?: ClassValue;
  colSpan?: number;
  sticky?: "left" | "right";
}

function Cell({
  children,
  className,
  colSpan = 1,
  sticky,
}: CellProps): ReactNode {
  const { hasHorizontalScroll } = useTableContext();

  return (
    <td
      className={cn(
        "whitespace-nowrap text-on-surface text-sm h-12 px-2 text-start group-hover:bg-surface-bright",
        sticky === "left" &&
          hasHorizontalScroll &&
          "sticky left-0 z-10 bg-surface before:content-[''] before:absolute before:top-0 before:bottom-0 before:right-0 before:w-px before:bg-outline",
        sticky === "right" &&
          hasHorizontalScroll &&
          "sticky right-0 z-10 bg-surface before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:w-px before:bg-outline",
        className
      )}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
}

const rowVariants = cva("", {
  variants: {
    variant: {
      default: "",
      body: "border-b border-outline last:border-none group",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface RowProps extends VariantProps<typeof rowVariants> {
  children: ReactNode;
  className?: ClassValue;
  onClick?: () => void;
}

function Row({ children, className, onClick, ...props }: RowProps): ReactNode {
  return (
    <tr className={cn(rowVariants(props), className)} onClick={onClick}>
      {children}
    </tr>
  );
}

interface EmptyProps {
  children: ReactNode;
  className?: string;
}

function Empty({ children, className }: EmptyProps) {
  const { columnsCount } = useTableContext();

  if (columnsCount <= 1) return null;

  return (
    <Table.Row>
      <Table.Cell colSpan={columnsCount}>
        <div data-empty className={className}>
          {children}
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

interface AccordionProps {
  children: ReactNode;
  className?: ClassValue;
}

function Accordion({ children, className }: AccordionProps): ReactNode {
  const { columnsCount } = useTableContext();

  return (
    <Table.Row variant={"body"} className={className}>
      <Table.Cell colSpan={columnsCount}>{children}</Table.Cell>
    </Table.Row>
  );
}

const Table = Object.assign(Container, {
  Header,
  Head,
  Body,
  Cell,
  Row,
  Empty,
  Accordion,
});

export { Table };
