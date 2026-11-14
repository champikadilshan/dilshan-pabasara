import type { CSSProperties } from 'react';
import { wedding } from '@/config/wedding';
import { Reveal } from './Reveal';
import { Section } from './Section';
import styles from './Programme.module.css';

export function Programme() {
  return (
    <Section id="programme" eyebrow="The day" title="Programme">
      <Reveal as="ol" className={styles.timeline}>
        {wedding.programme.map((item, index) => (
          <li key={item.title} className={styles.item} style={{ '--i': index } as CSSProperties}>
            <span className={styles.dot} aria-hidden="true" />
            <p className={styles.time}>{item.time}</p>
            <h3 className={styles.title}>{item.title}</h3>
            {item.note ? <p className={styles.note}>{item.note}</p> : null}
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
