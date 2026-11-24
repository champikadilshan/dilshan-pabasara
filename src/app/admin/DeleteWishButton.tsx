'use client';

import { useFormStatus } from 'react-dom';
import { deleteWish } from './actions';
import styles from './admin.module.css';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={styles.delete} disabled={pending}>
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  );
}

export function DeleteWishButton({ id, name }: { id: number; name: string }) {
  return (
    <form
      action={deleteWish}
      onSubmit={(event) => {
        if (!window.confirm(`Delete the wish from ${name}?`)) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <SubmitButton />
    </form>
  );
}
