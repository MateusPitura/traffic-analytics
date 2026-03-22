import { cva, VariantProps } from "class-variance-authority";
import { ClassValue } from "clsx";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps): ReactNode {
  return <table className="w-full">{children}</table>;
}

interface HeadProps {
  children: ReactNode;
  className?: ClassValue;
}

function Head({ children, className }: HeadProps): ReactNode {
  return (
    <th
      className={cn(
        "text-on-surface font-semibold text-sm h-12 px-3 text-start",
        "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-outline",
        className
      )}
    >
      {children}
    </th>
  );
}

interface CellProps {
  children: ReactNode;
  className?: ClassValue;
}

function Cell({ children, className }: CellProps): ReactNode {
  return (
    <td
      className={cn(
        "whitespace-nowrap text-on-surface text-sm h-12 px-3 text-start",
        className
      )}
    >
      {children}
    </td>
  );
}

const rowVariants = cva("", {
  variants: {
    variant: {
      body: "hover:bg-surface-bright border-b border-outline",
      header: "",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

interface RowProps extends VariantProps<typeof rowVariants> {
  children: ReactNode;
  className?: ClassValue
}

function Row({ children, className, ...props }: RowProps): ReactNode {
  return <tr className={cn(rowVariants(props), className)}>{children}</tr>;
}

const Table = Object.assign(Container, {
  Head,
  Cell,
  Row,
});

export { Table };
