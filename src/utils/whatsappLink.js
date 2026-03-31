/**
 * Normalize stored WhatsApp value to digits-only for https://wa.me/{digits}
 * Accepts "+44 7911 123456", "44-7911-123456", etc.
 */
export function whatsappDigits(raw) {
  if (raw == null || typeof raw !== 'string') return '';
  const trimmed = raw.trim();
  if (!trimmed) return '';
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 8 || digits.length > 15) return '';
  return digits;
}

export function whatsappHref(raw, presetMessage) {
  const digits = whatsappDigits(raw);
  if (!digits) return null;
  const base = `https://wa.me/${digits}`;
  if (presetMessage && String(presetMessage).trim()) {
    const q = new URLSearchParams({ text: String(presetMessage).trim() });
    return `${base}?${q.toString()}`;
  }
  return base;
}
