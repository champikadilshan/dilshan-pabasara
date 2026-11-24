import { wedding } from '@/config/wedding';

/**
 * Short link printed as the QR code on the "Share your moments" table cards.
 * Always forwards to the shared photo album, so the album can change without reprinting the cards.
 */
export function GET(request: Request) {
  const target = wedding.photoAlbum.url || '/#story';
  return Response.redirect(new URL(target, request.url), 307);
}
