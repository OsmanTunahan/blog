'use client';

import Link from "next/link";
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="fixed top-0 w-full border-b border-zinc-800 bg-black/50 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">Osman Tunahan</Link>
        <nav className="flex items-center space-x-6">
          <Link 
            href="https://osmantunahan.com.tr" 
            className="hover:text-zinc-400 transition"
          >
            Hakkımda
          </Link>
          {status === 'loading' ? (
            <div className="h-8 w-24 bg-zinc-800 rounded animate-pulse" />
          ) : session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400">{session.user?.email}</span>
              <button
                onClick={() => signOut()}
                className="text-sm hover:text-zinc-400 transition"
              >
                Çıkış Yap
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="text-sm hover:text-zinc-400 transition"
            >
              Giriş Yap
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
} 