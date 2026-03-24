import Bowser from "bowser";
import { ReactNode } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  Android,
  Apple,
  Chrome,
  Edge,
  Firefox,
  Linux,
  Windows,
} from "../../constants/svgs";

export function formatUrl(url: string): string {
  return url.replace(/^(https?:\/\/)?(www\.)?/, "");
}

const mapBrowserNameToIcon: Record<string, ReactNode> = {
  Chrome: <Chrome />,
  Edge: <Edge />,
  Mozilla: <Firefox />,
};

const mapSONameToIcon: Record<string, ReactNode> = {
  Linux: <Linux />,
  Android: <Android />,
  iOS: <Apple />,
  Windows: <Windows />,
};

export function formatUa(ua: string): ReactNode {
  const { browser, os } = Bowser.parse(ua);

  let browserName = browser.name;
  if (browserName === "Microsoft Edge") {
    browserName = "Edge";
  }

  const browserIcon = mapBrowserNameToIcon[browserName!];
  const osIcon = mapSONameToIcon[os.name!];

  return (
    <div className="flex gap-1 items-center">
      {browserIcon && <div className="h-4 w-4">{browserIcon}</div>}
      <span>{browserName}</span>
      {osIcon && <div className="h-4 w-4">{osIcon}</div>}
      {os.name}
    </div>
  );
}

export function formatRelativeDate(timestamp: string): string | undefined {
  const date = new Date(timestamp);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let relative: string | undefined;

  if (minutes < 60) {
    relative = `${minutes} min`;
  } else if (hours < 24) {
    relative = `${hours} hour`;
  } else if (days < 7) {
    relative = `${days} day`;
  }

  return relative;
}

export function formatAbsoluteDate(timestamp: string): string | undefined {
  const date = new Date(timestamp);

  const formatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const parts = formatter.formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  const formatted = `${get("hour")}:${get("minute")} (${get("weekday")}) ${get(
    "day"
  )}/${get("month")}/${get("year")}`;

  return formatted;
}

export function formatLocation(
  country: string,
  region: string,
  city: string,
  latitude: string,
  longitude: string
): ReactNode {
  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ReactCountryFlag countryCode={country} /> {country}, {region}, {city}
    </a>
  );
}

export function isGreaterThanOneMinute(date1: string, date2: string): boolean {
  const diffInMs = Math.abs(
    new Date(date1).getTime() - new Date(date2).getTime()
  );
  const oneMinuteInMs = 60 * 1000;

  return diffInMs > oneMinuteInMs;
}
