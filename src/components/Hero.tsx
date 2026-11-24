import type { CSSProperties } from 'react';
import { wedding } from '@/config/wedding';
import { HeroScene, Petals } from './GardenArt';
import styles from './Hero.module.css';

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

// Date pieces for the card-style date row, read from startsAt in Sri Lanka time.
const dateParts = (() => {
  const at = new Date(wedding.startsAt);
  const part = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Colombo', ...options }).format(at);
  return {
    weekday: part({ weekday: 'long' }),
    day: part({ day: 'numeric' }),
    month: part({ month: 'long' }),
    year: part({ year: 'numeric' }),
  };
})();

export function Hero({ guestName }: { guestName: string | null }) {
  return (
    <header className={styles.hero}>
      <Petals />
      <HeroScene className={styles.arch} data-hero="rise" style={delay(200)} />

      <div className={styles.body}>
        <p className={styles.eyebrow} data-hero="fade" style={delay(700)}>
          You are invited
        </p>
        <p className={styles.hosts} data-hero="fade" style={delay(850)}>
          <span className={styles.hostNames}>{wedding.hosts}</span>
          <span className={styles.invitation}>{wedding.invitationLine}</span>
        </p>

        <h1 className={styles.names}>
          <span className={styles.name} data-hero="write" style={delay(1050)}>
            {wedding.couple.first}
          </span>
          <span className={styles.and} data-hero="fade" style={delay(1750)}>
            &amp;
          </span>
          <span className={styles.name} data-hero="write" style={delay(1900)}>
            {wedding.couple.second}
          </span>
        </h1>

        <div className={styles.divider} data-hero="fade" style={delay(2450)} aria-hidden="true">
          <img src="/ornaments/lotus-mark.svg" alt="" width={60} height={42} />
        </div>

        <div className={styles.when} data-hero="fade" style={delay(2600)}>
          <time className={styles.dateRow} dateTime={wedding.startsAt}>
            <span className="visually-hidden">{wedding.dateLabel}</span>
            <span className={styles.dateSide} aria-hidden="true">
              {dateParts.weekday}
            </span>
            <span className={styles.dateDay} aria-hidden="true">
              {dateParts.day}
            </span>
            <span className={styles.dateSide} aria-hidden="true">
              {dateParts.month}
              <span className={styles.dateYear}>{dateParts.year}</span>
            </span>
          </time>
          <p className={styles.time}>{wedding.timeLabel}</p>
        </div>

        <div className={styles.where} data-hero="fade" style={delay(2800)}>
          <p className={styles.label}>Venue</p>
          <p className={styles.venue}>{wedding.venue.name}</p>
          <p className={styles.city}>{wedding.venue.city}</p>
        </div>

        <div className={styles.guestLine} data-hero="fade" style={delay(3000)}>
          {guestName ? (
            <>
              <p className={styles.guestLead}>We look forward to celebrating with</p>
              <p className={styles.guestName}>{guestName}</p>
            </>
          ) : (
            <p className={styles.guestLead}>We look forward to celebrating with you</p>
          )}
        </div>
      </div>

      <a href="#countdown" className={styles.cue} data-hero="fade" style={delay(3500)}>
        <span>Scroll</span>
        <span className={styles.cueLine} aria-hidden="true" />
      </a>
    </header>
  );
}
