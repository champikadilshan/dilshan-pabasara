import { wedding } from '@/config/wedding';
import { Reveal } from './Reveal';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Reveal className={styles.closing}>
        <p className={styles.line}>{wedding.closingLine}</p>
        <p className={styles.names}>
          {wedding.couple.first} <span className={styles.amp}>&amp;</span> {wedding.couple.second}
        </p>
        <p className={styles.date}>{wedding.shortDateLabel}</p>
      </Reveal>
      <img src="/ornaments/footer-garden.svg" alt="" width={540} height={124} className={styles.ornament} />
    </footer>
  );
}
