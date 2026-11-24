'use client';

import { useActionState } from 'react';
import shared from '@/components/shared.module.css';
import { login } from './actions';
import styles from './admin.module.css';

export function LoginForm() {
  const [error, action, pending] = useActionState(login, null);

  return (
    <form action={action} className={styles.login}>
      <label className={styles.field}>
        <span className={styles.label}>Password</span>
        <input
          className={styles.input}
          type="password"
          name="password"
          autoComplete="current-password"
          required
          autoFocus
        />
      </label>
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className={`${shared.button} ${shared.buttonSolid}`} disabled={pending}>
        {pending ? 'Checking…' : 'Open'}
      </button>
    </form>
  );
}
