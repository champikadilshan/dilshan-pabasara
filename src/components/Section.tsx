import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import shared from './shared.module.css';
import styles from './Section.module.css';

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, lead, children }: SectionProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={shared.divider} aria-hidden="true">
        <span className={shared.dividerMark} />
      </div>
      <Reveal className={styles.header}>
        <p className={shared.eyebrow}>{eyebrow}</p>
        <h2 id={`${id}-title`} className={shared.title}>
          {title}
        </h2>
        {lead ? <p className={shared.lead}>{lead}</p> : null}
      </Reveal>
      {children}
    </section>
  );
}
