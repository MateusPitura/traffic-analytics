import { Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SideBar } from "./SideBar";

export function PageLayout(): ReactNode {
  return (
    <div className="bg-surface h-screen flex w-full">
      <SideBar />
      <div className="p-4 w-full min-w-0 flex">
        <Outlet />
      </div>
    </div>
  );
}
