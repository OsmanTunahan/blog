'use client';

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut, Hammer } from 'lucide-react';

export default function Header() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            <div className="h-8 w-8 bg-zinc-800 rounded-full animate-pulse" />
          ) : session ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition group"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-zinc-800">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src="/default-avatar.svg"
                      alt="Default Profile"
                      fill
                      className="object-cover p-1 text-white"
                    />
                  )}
                </div>
                <ChevronDown size={16} className={`transition-transform group-hover:text-zinc-400 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-zinc-900/95 backdrop-blur-sm rounded-xl shadow-lg border border-zinc-800/50">
                  <div className="p-4 border-b border-zinc-800/50">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
                        {session.user?.image ? (
                          <Image
                            src={session.user.image}
                            alt="Profile"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Image
                            src="/default-avatar.svg"
                            alt="Default Profile"
                            fill
                            className="object-cover p-1.5 text-white"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{session.user?.name}</p>
                        <p className="text-xs text-zinc-400 truncate">{session.user?.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <Link
                      href="/admin"
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition"
                    >
                      <Hammer size={16} />
                      Admin Panel
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition"
                    >
                      <LogOut size={16} />
                      Çıkış Yap
                    </button>
                  </div>
                </div>
              )}
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