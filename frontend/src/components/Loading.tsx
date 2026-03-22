import type { ReactNode } from "react";
import Spinner from "./ui/Spinner";

export function Loading(): ReactNode {
  return (
    <div className="h-full flex items-center justify-center">
      <Spinner />
    </div>
  );
}
