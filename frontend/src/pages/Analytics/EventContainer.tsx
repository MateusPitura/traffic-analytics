import { contract } from "@shared/contract";
import { ClientInferResponses } from "@ts-rest/core";
import type { ReactNode } from "react";
import { Tooltip } from "../../components/ui/Tooltip";
import {
    formatAbsoluteDate,
    formatRelativeDate,
    formatUrl,
} from "./formatters";

interface EventContainerProperties {
  item: ClientInferResponses<
    typeof contract.analytics.list,
    200
  >["body"]["payload"][number]["events"][number];
}

export function EventContainer({
  item,
}: EventContainerProperties): ReactNode {
  return (
    <div key={item.timestamp} className="flex gap-2 text-secondary">
      <Tooltip content={formatAbsoluteDate(item.timestamp)}>
        <span>{formatRelativeDate(item.timestamp)}</span>
      </Tooltip>
      | <span>{formatUrl(item.url)}</span>
      | <span>{item.action}: {item.metadata}</span>
    </div>
  );
}
