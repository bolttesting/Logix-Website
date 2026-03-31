/** Split contact fields stored as newline-separated text (one value per line). */
export function parseContactLines(raw) {
  if (raw == null || raw === '') return [];
  const str = String(raw).trim();
  if (!str) return [];
  return str
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function contactEmails(settings, fallback = 'info@logixcontact.co.uk') {
  const lines = parseContactLines(settings?.email);
  return lines.length ? lines : [fallback];
}

export function contactPhones(settings, fallback = '+123-456-7890') {
  const lines = parseContactLines(settings?.phone);
  return lines.length ? lines : [fallback];
}

export function telHref(display) {
  const digits = String(display).replace(/\D/g, '');
  return digits ? `tel:${digits}` : '#';
}
