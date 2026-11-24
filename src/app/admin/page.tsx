import type { Metadata } from 'next';
import shared from '@/components/shared.module.css';
import { coupleNames } from '@/config/wedding';
import { formatTime, isAdmin, loadAdminData } from '@/lib/admin';
import { logout } from './actions';
import { DeleteWishButton } from './DeleteWishButton';
import { LoginForm } from './LoginForm';
import styles from './admin.module.css';

// Always render on request: the page depends on the login cookie and live data.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: `Guest replies · ${coupleNames}`,
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return (
      <main className={styles.page}>
        <header className={styles.head}>
          <p className={shared.eyebrow}>{coupleNames}</p>
          <h1 className={styles.title}>Guest replies</h1>
        </header>
        <LoginForm />
      </main>
    );
  }

  const data = await loadAdminData();

  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <p className={shared.eyebrow}>{coupleNames}</p>
        <h1 className={styles.title}>Guest replies</h1>
        <div className={styles.actions}>
          {data ? (
            <a className={shared.button} href="/admin/rsvps.csv">
              Download CSV
            </a>
          ) : null}
          <form action={logout}>
            <button type="submit" className={shared.button}>
              Log out
            </button>
          </form>
        </div>
      </header>

      {!data ? (
        <p className={styles.notice}>
          The database is not connected yet. In Vercel, open Storage → Create Database → Neon, connect it to this
          project and redeploy.
        </p>
      ) : (
        <>
          <dl className={styles.stats}>
            <div>
              <dt>People coming</dt>
              <dd>{data.totals.people}</dd>
            </div>
            <div>
              <dt>Accepted</dt>
              <dd>{data.totals.accepted}</dd>
            </div>
            <div>
              <dt>Declined</dt>
              <dd>{data.totals.declined}</dd>
            </div>
            <div>
              <dt>Replies</dt>
              <dd>{data.totals.replies}</dd>
            </div>
          </dl>

          <section className={styles.block} aria-labelledby="latest-title">
            <h2 id="latest-title" className={styles.subtitle}>
              Replies
            </h2>
            <p className={styles.hint}>
              One row per guest, showing their newest answer. “Updated” means they replied more than once.
            </p>
            {data.latest.length === 0 ? (
              <p className={styles.empty}>No replies yet.</p>
            ) : (
              <div className={styles.tableBox}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th scope="col">Invitation</th>
                      <th scope="col">Name given</th>
                      <th scope="col">Answer</th>
                      <th scope="col" className={styles.num}>
                        Guests
                      </th>
                      <th scope="col">Note</th>
                      <th scope="col">When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.latest.map((row) => (
                      <tr key={row.id}>
                        <td>{row.invite_name ?? <span className={styles.muted}>No link</span>}</td>
                        <td>{row.name}</td>
                        <td>
                          <span className={row.attending ? styles.yes : styles.no}>
                            {row.attending ? 'Coming' : 'Not coming'}
                          </span>
                          {row.replies > 1 ? <span className={styles.badge}>Updated</span> : null}
                        </td>
                        <td className={styles.num}>{row.attending ? row.guests : '–'}</td>
                        <td className={styles.note}>{row.message}</td>
                        <td className={styles.when}>{formatTime(row.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {data.rsvps.length > data.latest.length ? (
            <details className={styles.block}>
              <summary className={styles.summary}>Every submission ({data.rsvps.length})</summary>
              <div className={styles.tableBox}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th scope="col">Invitation</th>
                      <th scope="col">Name given</th>
                      <th scope="col">Answer</th>
                      <th scope="col" className={styles.num}>
                        Guests
                      </th>
                      <th scope="col">When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rsvps.map((row) => (
                      <tr key={row.id}>
                        <td>{row.invite_name ?? '–'}</td>
                        <td>{row.name}</td>
                        <td>{row.attending ? 'Coming' : 'Not coming'}</td>
                        <td className={styles.num}>{row.attending ? row.guests : '–'}</td>
                        <td className={styles.when}>{formatTime(row.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          ) : null}

          <section className={styles.block} aria-labelledby="wishes-title">
            <h2 id="wishes-title" className={styles.subtitle}>
              Wishes ({data.wishes.length})
            </h2>
            {data.wishes.length === 0 ? (
              <p className={styles.empty}>No wishes yet.</p>
            ) : (
              <ul className={styles.wishes}>
                {data.wishes.map((wish) => (
                  <li key={wish.id}>
                    <p className={styles.wishText}>{wish.message}</p>
                    <div className={styles.wishFoot}>
                      <p className={styles.wishBy}>
                        {wish.name} · {formatTime(wish.created_at)}
                      </p>
                      <DeleteWishButton id={wish.id} name={wish.name} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </main>
  );
}
