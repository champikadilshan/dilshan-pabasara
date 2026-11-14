'use client';

import { useState, type FormEvent } from 'react';
import { wedding } from '@/config/wedding';
import { Reveal } from './Reveal';
import { Section } from './Section';
import shared from './shared.module.css';
import styles from './Rsvp.module.css';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Rsvp({ guestName }: { guestName: string | null }) {
  const [name, setName] = useState(guestName ?? '');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const changeGuests = (delta: number) => {
    setGuests((count) => Math.min(wedding.maxGuestsPerRsvp, Math.max(1, count + delta)));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (attending === null) {
      setStatus('error');
      setError('Please let us know if you can join us.');
      return;
    }

    setStatus('sending');
    setError('');

    const website = new FormData(event.currentTarget).get('website');
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, attending, guests, message, inviteName: guestName, website }),
    }).catch(() => null);

    if (response?.ok) {
      setStatus('sent');
      return;
    }

    const data = (await response?.json().catch(() => null)) as { error?: string } | null;
    setStatus('error');
    setError(data?.error ?? 'Something went wrong. Please try again.');
  };

  if (status === 'sent') {
    return (
      <Section id="rsvp" eyebrow="RSVP" title="Will you join us?">
        <div className={styles.thanks} role="status">
          <p className={styles.thanksScript}>Thank you</p>
          <p>
            {attending
              ? 'We can’t wait to celebrate with you.'
              : 'We’ll miss you, and we’re grateful for your blessings.'}
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section id="rsvp" eyebrow="RSVP" title="Will you join us?" lead={wedding.rsvpDeadlineLabel || undefined}>
      <Reveal>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.field}>
            <span className={styles.label}>Your name</span>
            <input
              className={styles.input}
              name="name"
              autoComplete="name"
              required
              maxLength={80}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <fieldset className={styles.choice}>
            <legend className={styles.label}>Will you attend?</legend>
            <button
              type="button"
              className={styles.option}
              aria-pressed={attending === true}
              onClick={() => setAttending(true)}
            >
              Joyfully accepts
            </button>
            <button
              type="button"
              className={styles.option}
              aria-pressed={attending === false}
              onClick={() => setAttending(false)}
            >
              Regretfully declines
            </button>
          </fieldset>

          {attending ? (
            <div className={styles.field}>
              <span className={styles.label} id="guest-count-label">
                Number of guests
              </span>
              <div className={styles.stepper} role="group" aria-labelledby="guest-count-label">
                <button type="button" onClick={() => changeGuests(-1)} disabled={guests <= 1} aria-label="Fewer guests">
                  −
                </button>
                <output aria-live="polite">{guests}</output>
                <button
                  type="button"
                  onClick={() => changeGuests(1)}
                  disabled={guests >= wedding.maxGuestsPerRsvp}
                  aria-label="More guests"
                >
                  +
                </button>
              </div>
            </div>
          ) : null}

          <label className={styles.field}>
            <span className={styles.label}>A note for us (optional)</span>
            <textarea
              className={styles.input}
              name="message"
              rows={3}
              maxLength={500}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>

          <label className="visually-hidden" aria-hidden="true">
            Leave this empty
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>

          {status === 'error' ? (
            <p className={styles.error} role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className={`${shared.button} ${shared.buttonSolid} ${styles.submit}`}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Send RSVP'}
          </button>
        </form>
      </Reveal>
    </Section>
  );
}
