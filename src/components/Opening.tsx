'use client';

import { useEffect, useState } from 'react';
import { wedding } from '@/config/wedding';
import styles from './Opening.module.css';

type Phase = 'closed' | 'opening' | 'open';

const openingDuration = 1300;

export function Opening({ guestName }: { guestName: string | null }) {
  const [phase, setPhase] = useState<Phase>('closed');

  useEffect(() => {
    if (phase === 'open') return;
    const { style } = document.body;
    const previous = style.overflow;
    style.overflow = 'hidden';
    return () => {
      style.overflow = previous;
    };
  }, [phase]);

  const handleOpen = () => {
    if (phase !== 'closed') return;
    window.scrollTo(0, 0);
    document.documentElement.dataset.opened = 'true';
    setPhase('opening');
    window.setTimeout(() => setPhase('open'), openingDuration);
  };

  if (phase === 'open') return null;

  return (
    <div className={styles.overlay} data-opening data-phase={phase}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>The wedding of</p>
        <p className={styles.names}>
          {wedding.couple.first}
          <span className={styles.amp}>&amp;</span>
          {wedding.couple.second}
        </p>

        <button type="button" className={styles.seal} onClick={handleOpen} aria-label="Open the invitation">
          <img src="/ornaments/mandala-full.svg" alt="" width={301} height={301} className={styles.mandala} />
        </button>

        {guestName ? (
          <p className={styles.greeting}>
            Dear <span className={styles.guest}>{guestName}</span>,<br />
            you are warmly invited
          </p>
        ) : (
          <p className={styles.greeting}>You are warmly invited</p>
        )}

        <button type="button" className={styles.hint} onClick={handleOpen}>
          Tap to open
        </button>
      </div>
    </div>
  );
}
