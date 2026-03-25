import type { ReactNode } from "react";

interface ClientTagProperties {
  name: string;
  color: string;
}

export function ClientTag({ color, name }: ClientTagProperties): ReactNode {
  return (
    <div
      className="px-2 py-1 rounded-md font-medium"
      style={{
        backgroundColor: color,
      }}
    >
      {name}
    </div>
  );
}
