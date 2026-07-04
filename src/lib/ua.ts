/** Compact, dependency-free user-agent parser tuned for analytics buckets. */

export interface ParsedUA {
  deviceType: "desktop" | "mobile" | "tablet" | "bot";
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  isBot: boolean;
}

const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|preview|monitor|pingdom|lighthouse|headless|python-requests|curl|wget|axios|go-http|scrapy|semrush|ahrefs|mj12|dotbot|petalbot|bytespider|gptbot|claudebot|ccbot|amazonbot|applebot|duckduckbot|yandex/i;

export function parseUA(ua: string | null | undefined): ParsedUA {
  const s = ua || "";
  const isBot = !s || BOT_RE.test(s);

  // OS
  let os = "Other";
  let osVersion = "";
  if (/Windows NT 10/.test(s)) { os = "Windows"; osVersion = "10/11"; }
  else if (/Windows/.test(s)) { os = "Windows"; }
  else if (/iPhone|iPad|iPod/.test(s)) {
    os = "iOS";
    osVersion = (s.match(/OS (\d+)[._]/) || [])[1] || "";
  } else if (/Mac OS X/.test(s)) {
    os = "macOS";
    osVersion = (s.match(/Mac OS X (\d+)[._](\d+)/) || []).slice(1).join(".") || "";
  } else if (/Android/.test(s)) {
    os = "Android";
    osVersion = (s.match(/Android (\d+(\.\d+)?)/) || [])[1] || "";
  } else if (/CrOS/.test(s)) { os = "ChromeOS"; }
  else if (/Linux/.test(s)) { os = "Linux"; }

  // Browser (order matters)
  let browser = "Other";
  let browserVersion = "";
  const pick = (name: string, re: RegExp) => {
    const m = s.match(re);
    if (m) { browser = name; browserVersion = m[1] || ""; return true; }
    return false;
  };
  pick("Edge", /Edg(?:e|A|iOS)?\/(\d+)/) ||
    pick("Samsung Internet", /SamsungBrowser\/(\d+)/) ||
    pick("Opera", /(?:OPR|Opera)\/(\d+)/) ||
    pick("UC Browser", /UCBrowser\/(\d+)/) ||
    pick("Firefox", /(?:Firefox|FxiOS)\/(\d+)/) ||
    pick("Chrome", /(?:Chrome|CriOS)\/(\d+)/) ||
    pick("Safari", /Version\/(\d+).+Safari/);

  // Device type
  let deviceType: ParsedUA["deviceType"] = "desktop";
  if (isBot) deviceType = "bot";
  else if (/iPad|Tablet|Nexus 7|Nexus 9|SM-T/i.test(s)) deviceType = "tablet";
  else if (/Mobi|iPhone|Android.+Mobile/i.test(s)) deviceType = "mobile";

  return { deviceType, browser, browserVersion, os, osVersion, isBot };
}
