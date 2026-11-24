import type { CSSProperties } from 'react';
import { wedding } from '@/config/wedding';
import { HeroScene, Petals } from './GardenArt';
import styles from './Hero.module.css';

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

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
          {wedding.hosts} {wedding.invitationLine}
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

        <p className={styles.date} data-hero="fade" style={delay(2550)}>
          {wedding.dateLabel}
        </p>
        <p className={styles.details} data-hero="fade" style={delay(2650)}>
          {wedding.timeLabel}
        </p>
        <p className={styles.venue} data-hero="fade" style={delay(2750)}>
          {wedding.venue.name}
          <span className={styles.city}>{wedding.venue.city}</span>
        </p>
        <p className={styles.ceremony} data-hero="fade" style={delay(2850)}>
          {wedding.ceremonyLine}
        </p>

        <div className={styles.guestLine} data-hero="fade" style={delay(3050)}>
          <p className={styles.guestLead}>We look forward to celebrating with</p>
          <p className={styles.guestName}>{guestName ?? 'you & your family'}</p>
        </div>
      </div>

      <a href="#countdown" className={styles.cue} data-hero="fade" style={delay(3500)}>
        <span>Scroll</span>
        <span className={styles.cueLine} aria-hidden="true" />
      </a>
    </header>
  );
}
