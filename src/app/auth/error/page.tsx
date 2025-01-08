'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="mb-6 text-zinc-400">
          {error === 'AccessDenied' 
            ? 'Your email is not in the whitelist. Please contact the administrator.'
            : 'There was an error signing in. Please try again.'}
        </p>
        <Link 
          href="/"
          className="inline-block bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
