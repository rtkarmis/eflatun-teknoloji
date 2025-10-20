import type { CookieConsentState } from "@/types/cookie-consent";

export const defaultConsent: CookieConsentState = {
  necessary: true,
  analytics: false,
  ads: false,
};

export function saveConsent(consent: CookieConsentState): void {
  localStorage.setItem("cookie-consent", JSON.stringify(consent));
}

export function loadConsent(): CookieConsentState {
  try {
    const data = localStorage.getItem("cookie-consent");
    if (!data) return defaultConsent;
    return { ...defaultConsent, ...JSON.parse(data) };
  } catch {
    return defaultConsent;
  }
}
