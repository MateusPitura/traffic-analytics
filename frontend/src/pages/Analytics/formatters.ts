import Bowser from "bowser";

export function removeProtocol(url: string): string {
  return url.replace(/^https?:\/\//, '');
}

export function formatUA(ua: string): string {
    const parsed = Bowser.parse(ua)
    console.log('🌠 parsed: ', parsed); // 🌠 display icon for browser, os and type (in type show screen info)
    return ''
}