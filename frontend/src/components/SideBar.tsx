import { useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Group, Link } from "../icons";
import { Button } from "./ui/Button";

export function SideBar(): ReactNode {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-surface-bright w-fit p-4 flex flex-col gap-4">
      <Button
        label={<Link/>}
        variant={"secondary"}
        width={"fit"}
        onClick={() =>
          navigate({
            to: "/",
          })
        }
      />
      <Button
        label={<Group/>}
        variant={"secondary"}
        width={"fit"}
        onClick={() =>
          navigate({
            to: "/clients",
          })
        }
      />
    </div>
  );
}
