'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminConfigured, adminCookieMaxAge, adminCookieName, passwordMatches, sessionValue } from '@/lib/admin';

export async function login(_previous: string | null, formData: FormData): Promise<string | null> {
  if (!adminConfigured()) {
    return 'The admin password is not set yet. Add ADMIN_PASSWORD in Vercel and redeploy.';
  }

  const password = String(formData.get('password') ?? '');
  if (!passwordMatches(password)) {
    // Slow down guessing a little.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return 'That password is not right.';
  }

  (await cookies()).set(adminCookieName, sessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: adminCookieMaxAge,
  });
  redirect('/admin');
}

export async function logout() {
  (await cookies()).delete({ name: adminCookieName, path: '/admin' });
  redirect('/admin');
}
