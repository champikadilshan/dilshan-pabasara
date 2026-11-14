import type { CSSProperties } from 'react';
import { wedding } from '@/config/wedding';
import styles from './Hero.module.css';

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export function Hero({ guestName }: { guestName: string | null }) {
  return (
    <header className={styles.hero}>
      <img
        src="/ornaments/mandala-half.svg"
        alt=""
        width={301}
        height={151}
        className={styles.mandala}
        data-hero="drop"
        style={delay(250)}
      />

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
            and
          </span>
          <span className={styles.name} data-hero="write" style={delay(1900)}>
            {wedding.couple.second}
          </span>
        </h1>

        <p className={styles.date} data-hero="fade" style={delay(2550)}>
          {wedding.dateLabel}
        </p>
        <p className={styles.details} data-hero="fade" style={delay(2700)}>
          {wedding.timeLabel} · {wedding.venue.name}, {wedding.venue.city}
        </p>

        <p className={styles.guestLine} data-hero="fade" style={delay(2900)}>
          {guestName ? (
            <>
              <span>Mr. / Mrs.:</span>
              <span className={styles.guestName}>{guestName}</span>
              <span>You / Your Family Are Invited!</span>
            </>
          ) : (
            <span>You &amp; Your Family Are Invited!</span>
          )}
        </p>
      </div>

      <a href="#countdown" className={styles.cue} data-hero="fade" style={delay(3400)}>
        <span>Scroll</span>
        <span className={styles.cueLine} aria-hidden="true" />
      </a>
    </header>
  );
}
