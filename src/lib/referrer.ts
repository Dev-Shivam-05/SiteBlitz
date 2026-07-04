/** Classify a referrer + UTM params into source/medium for attribution. */

const SEARCH_ENGINES: Record<string, string> = {
  "google.": "google",
  "bing.com": "bing",
  "duckduckgo.com": "duckduckgo",
  "yahoo.": "yahoo",
  "yandex.": "yandex",
  "baidu.com": "baidu",
  "ecosia.org": "ecosia",
  "brave.com": "brave",
};

const SOCIAL: Record<string, string> = {
  "instagram.com": "instagram",
  "facebook.com": "facebook",
  "fb.com": "facebook",
  "twitter.com": "x",
  "x.com": "x",
  "t.co": "x",
  "linkedin.com": "linkedin",
  "lnkd.in": "linkedin",
  "youtube.com": "youtube",
  "youtu.be": "youtube",
  "pinterest.": "pinterest",
  "reddit.com": "reddit",
  "whatsapp.com": "whatsapp",
  "wa.me": "whatsapp",
  "t.me": "telegram",
  "telegram.": "telegram",
  "threads.net": "threads",
};

const AI: Record<string, string> = {
  "chat.openai.com": "chatgpt",
  "chatgpt.com": "chatgpt",
  "perplexity.ai": "perplexity",
  "claude.ai": "claude",
  "gemini.google.com": "gemini",
  "copilot.microsoft.com": "copilot",
};

export interface Attribution {
  source: string;
  medium: string;
  referrerHost: string;
}

export function classifyReferrer(
  referrer: string | null | undefined,
  utmSource?: string | null,
  utmMedium?: string | null,
  selfHost?: string
): Attribution {
  if (utmSource) {
    return {
      source: utmSource.toLowerCase(),
      medium: (utmMedium || "campaign").toLowerCase(),
      referrerHost: hostOf(referrer),
    };
  }

  const host = hostOf(referrer);
  if (!host || (selfHost && host.includes(selfHost))) {
    return { source: "direct", medium: "direct", referrerHost: "" };
  }

  for (const [k, v] of Object.entries(SEARCH_ENGINES)) {
    if (host.includes(k)) return { source: v, medium: "organic", referrerHost: host };
  }
  for (const [k, v] of Object.entries(SOCIAL)) {
    if (host.includes(k)) return { source: v, medium: "social", referrerHost: host };
  }
  for (const [k, v] of Object.entries(AI)) {
    if (host.includes(k)) return { source: v, medium: "ai", referrerHost: host };
  }
  return { source: host.replace(/^www\./, ""), medium: "referral", referrerHost: host };
}

function hostOf(url: string | null | undefined): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}
