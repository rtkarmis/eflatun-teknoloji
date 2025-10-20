export type ConsentCategory = "necessary" | "analytics" | "ads";

export interface CookieConsentState {
  necessary: boolean;
  analytics: boolean;
  ads: boolean;
}
