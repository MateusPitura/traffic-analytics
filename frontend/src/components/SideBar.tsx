import { useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "./ui/Button";

export function SideBar(): ReactNode {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-surface-bright w-64 p-4 flex flex-col gap-4">
      <h1 className="text-3xl text-on-surface font-medium text-center">
        Analytics
      </h1>
      <Button
        label="Domains"
        variant={"secondary"}
        width={"full"}
        onClick={() =>
          navigate({
            to: "/",
          })
        }
      />
      <Button
        label="Clients"
        variant={"secondary"}
        width={"full"}
        onClick={() =>
          navigate({
            to: "/clients",
          })
        }
      />
    </div>
  );
}
