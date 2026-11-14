'use client';

import { useEffect, useState, type FormEvent } from 'react';
import type { Wish } from '@/lib/types';
import { Reveal } from './Reveal';
import { Section } from './Section';
import shared from './shared.module.css';
import styles from './Wishes.module.css';

type Status = 'idle' | 'sending' | 'error';

export function Wishes({ guestName }: { guestName: string | null }) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState(guestName ?? '');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    fetch('/api/wishes')
      .then((response) => (response.ok ? response.json() : { wishes: [] }))
      .then((data: { wishes: Wish[] }) => {
        if (active) setWishes(data.wishes);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatus('error');
      setError('Please add your name and a few words.');
      return;
    }

    setStatus('sending');
    setError('');

    const website = new FormData(event.currentTarget).get('website');
    const response = await fetch('/api/wishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message, website }),
    }).catch(() => null);

    const data = (await response?.json().catch(() => null)) as { wish?: Wish; error?: string } | null;
    if (response?.ok && data?.wish) {
      setWishes((current) => [data.wish as Wish, ...current]);
      setMessage('');
      setStatus('idle');
      return;
    }

    setStatus('error');
    setError(data?.error ?? 'Something went wrong. Please try again.');
  };

  return (
    <Section id="wishes" eyebrow="Blessings" title="Leave Us a Wish">
      <Reveal>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <input
            className={styles.input}
            name="name"
            placeholder="Your name"
            autoComplete="name"
            maxLength={60}
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-label="Your name"
          />
          <textarea
            className={styles.input}
            name="message"
            placeholder="Your wishes for the couple…"
            rows={3}
            maxLength={400}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            aria-label="Your wish"
          />
          <label className="visually-hidden" aria-hidden="true">
            Leave this empty
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          {status === 'error' ? (
            <p className={styles.error} role="alert">
              {error}
            </p>
          ) : null}
          <button type="submit" className={shared.button} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send wishes'}
          </button>
        </form>
      </Reveal>

      {wishes.length > 0 ? (
        <ul className={styles.list}>
          {wishes.map((wish) => (
            <li key={wish.id} className={styles.wish}>
              <p className={styles.message}>“{wish.message}”</p>
              <p className={styles.author}>— {wish.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>Be the first to leave a wish.</p>
      )}
    </Section>
  );
}
