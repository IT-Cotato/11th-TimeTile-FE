import { Suspense } from 'react';
import OAuthRegisterClient from './_client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page() {
  return (
    <Suspense fallback={null}>
      <OAuthRegisterClient />
    </Suspense>
  );
}
