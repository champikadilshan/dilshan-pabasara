'use client';

import { useEffect, useState } from 'react';
import { wedding } from '@/config/wedding';
import { Reveal } from './Reveal';
import { Section } from './Section';
import styles from './Countdown.module.css';

const target = new Date(wedding.startsAt).getTime();

const units = [
  { label: 'Days', ms: 86_400_000 },
  { label: 'Hours', ms: 3_600_000 },
  { label: 'Minutes', ms: 60_000 },
  { label: 'Seconds', ms: 1_000 },
];

function split(remaining: number): number[] {
  let rest = Math.max(0, remaining);
  return units.map(({ ms }) => {
    const value = Math.floor(rest / ms);
    rest -= value * ms;
    return value;
  });
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const remaining = now === null ? null : target - now;
  const values = remaining === null ? null : split(remaining);
  const isToday = remaining !== null && remaining <= 0;

  return (
    <Section id="countdown" eyebrow="Counting down" title={isToday ? 'Today is the day' : 'Until our forever begins...'}>
      <Reveal className={styles.grid} delay={150}>
        {units.map((unit, index) => (
          <div key={unit.label} className={styles.cell}>
            <span className={styles.value} suppressHydrationWarning>
              {values ? String(values[index]).padStart(2, '0') : '––'}
            </span>
            <span className={styles.label}>{unit.label}</span>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
