const DEFAULT_RETURN_TO = "/dashboard";

const ALLOWED_RETURN_PREFIXES = [
  "/dashboard",
  "/assessment",
  "/tests",
  "/types",
  "/pricing",
];

export function sanitizeReturnTo(
  value: string | null | undefined,
  fallback = DEFAULT_RETURN_TO,
) {
  if (!value) return fallback;

  const trimmed = value.trim();

  if (
    !trimmed.startsWith("/") ||
    trimmed.startsWith("//") ||
    /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)
  ) {
    return fallback;
  }

  const pathOnly = trimmed.split(/[?#]/)[0] || "/";
  const isAllowed = ALLOWED_RETURN_PREFIXES.some(
    (prefix) => pathOnly === prefix || pathOnly.startsWith(`${prefix}/`),
  );

  return isAllowed ? trimmed : fallback;
}

export function buildPaywallUrl(returnTo: string) {
  return `/paywall?returnTo=${encodeURIComponent(
    sanitizeReturnTo(returnTo),
  )}`;
}
