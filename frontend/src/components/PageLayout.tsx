import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageLayout(): ReactNode {
  return (
    <div>
      <div>
        Page Side Bar
        <Link to="/">Domains</Link>
        <Link to="/">Clients</Link>
      </div>
      <Outlet />
    </div>
  );
}
