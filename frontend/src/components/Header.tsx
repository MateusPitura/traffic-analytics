import type { ReactNode } from "react";

interface HeaderProperties {
  title: string;
}

export function Header({ title }: HeaderProperties): ReactNode {
  return <h2 className="text-on-surface text-4xl font-medium">{title}</h2>;
}
