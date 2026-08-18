const DEFAULT = "http://localhost:3000";

export function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || DEFAULT;
}

export const API_CONFIG = {
  get BASE_URL(): string {
    return getBaseUrl();
  },
  TIMEOUT: 20000,
} as const;
