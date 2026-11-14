const maxLength = 60;

/**
 * Reads the guest name from a personal link such as `/?guest=Nimal` or `/?guest=Nimal-Perera`.
 */
export function parseGuestName(value: string | string[] | undefined): string | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return null;

  const name = raw
    .replace(/[-_+]+/g, ' ')
    .replace(/[<>{}[\]\\/"`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);

  return name.length > 0 ? name : null;
}
