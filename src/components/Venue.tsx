import { wedding } from '@/config/wedding';
import { googleCalendarUrl } from '@/lib/calendar';
import { Reveal } from './Reveal';
import { Section } from './Section';
import shared from './shared.module.css';
import styles from './Venue.module.css';

export function Venue() {
  return (
    <Section id="venue" eyebrow="Where" title="The Venue">
      <Reveal className={styles.card}>
        <p className={styles.name}>{wedding.venue.name}</p>
        <p className={styles.city}>{wedding.venue.city}</p>
        <p className={styles.when}>
          {wedding.dateLabel}
          <br />
          {wedding.timeLabel}
        </p>

        <a
          className={`${shared.button} ${shared.buttonSolid}`}
          href={wedding.venue.mapsUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open in Google Maps
        </a>

        <div className={styles.calendar}>
          <span className={styles.calendarLabel}>Save the date</span>
          <div className={styles.calendarLinks}>
            <a href={googleCalendarUrl()} target="_blank" rel="noreferrer">
              Google Calendar
            </a>
            <span aria-hidden="true">·</span>
            <a href="/calendar.ics">Apple / Outlook</a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
