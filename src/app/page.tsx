import type { Metadata } from 'next';
import { Countdown } from '@/components/Countdown';
import { Footer } from '@/components/Footer';
import { Gallery } from '@/components/Gallery';
import { Hero } from '@/components/Hero';
import { Opening } from '@/components/Opening';
import { Programme } from '@/components/Programme';
import { Rsvp } from '@/components/Rsvp';
import { Venue } from '@/components/Venue';
import { Wishes } from '@/components/Wishes';
import { coupleNames, wedding } from '@/config/wedding';
import { parseGuestName } from '@/lib/guest';

type PageProps = {
  searchParams: Promise<{ guest?: string | string[]; album?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const guestName = parseGuestName((await searchParams).guest);
  const title = `${coupleNames} · ${wedding.dateLabel}`;
  const description = guestName
    ? `Dear ${guestName}, you are warmly invited to the wedding of ${coupleNames} at ${wedding.venue.name}, ${wedding.venue.city}.`
    : `You are invited to celebrate the wedding of ${coupleNames} on ${wedding.dateLabel} at ${wedding.venue.name}, ${wedding.venue.city}.`;

  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
  };
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const guestName = parseGuestName(params.guest);
  const previewAlbum = params.album === 'open';

  return (
    <>
      <Opening guestName={guestName} />
      <main>
        <Hero guestName={guestName} />
        <Countdown />
        <Programme />
        <Venue />
        <Gallery previewAlbum={previewAlbum} />
        <Rsvp guestName={guestName} />
        <Wishes guestName={guestName} />
      </main>
      <Footer />
    </>
  );
}
