export const COOKIE_CONSENT_KEY = 'lc_cookie_consent_v1';
export const COOKIE_PREFS_KEY = 'lc_cookie_prefs_v1';
export const COOKIE_CONSENT_EVENT = 'lc-cookie-consent-updated';

export function getCookiePrefs() {
  try {
    const raw = window.localStorage.getItem(COOKIE_PREFS_KEY);
    if (!raw) return { essential: true, analytics: false };
    const parsed = JSON.parse(raw);
    return {
      essential: true,
      analytics: Boolean(parsed?.analytics),
    };
  } catch {
    return { essential: true, analytics: false };
  }
}

export function setCookiePrefs(status, prefs) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, status);
    window.localStorage.setItem(
      COOKIE_PREFS_KEY,
      JSON.stringify({
        essential: true,
        analytics: Boolean(prefs?.analytics),
        updated_at: new Date().toISOString(),
      }),
    );
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT));
  } catch {
    // Ignore storage errors and keep UX responsive.
  }
}

export function hasCookieDecision() {
  try {
    const v = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return v === 'accepted' || v === 'rejected';
  } catch {
    return false;
  }
}
