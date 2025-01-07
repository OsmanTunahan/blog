"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarNavItems } from "./nav-items";
import { ChevronRight } from "lucide-react";
import { Footer } from "@/components/admin/Footer";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="relative flex h-full flex-col">
      {/* Logo & Title */}
      <div className="flex items-center gap-3 px-8 py-8 border-b border-zinc-800">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <ChevronRight className="h-5 w-5 text-white" />
        </div>
        <Link href="/admin" className="flex items-center">
          <span className="text-xl font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-6">
        <div className="space-y-8 px-4">
          {/* Overview Section */}
          <div>
            <h2 className="mb-2 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Overview
            </h2>
            <nav className="space-y-1">
              {sidebarNavItems.overview.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-150",
                      isActive
                        ? "bg-gradient-to-r from-violet-600/15 to-indigo-600/15 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5 transition-colors duration-150",
                      isActive
                        ? "text-violet-400"
                        : "text-zinc-500 group-hover:text-zinc-300"
                    )} />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Content Section */}
          <div>
            <h2 className="mb-2 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Content
            </h2>
            <nav className="space-y-1">
              {sidebarNavItems.content.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-150",
                      isActive
                        ? "bg-gradient-to-r from-violet-600/15 to-indigo-600/15 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5 transition-colors duration-150",
                      isActive
                        ? "text-violet-400"
                        : "text-zinc-500 group-hover:text-zinc-300"
                    )} />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* System Section */}
          <div>
            <h2 className="mb-2 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              System
            </h2>
            <nav className="space-y-1">
              {sidebarNavItems.system.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-150",
                      isActive
                        ? "bg-gradient-to-r from-violet-600/15 to-indigo-600/15 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5 transition-colors duration-150",
                      isActive
                        ? "text-violet-400"
                        : "text-zinc-500 group-hover:text-zinc-300"
                    )} />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-zinc-800 p-6">
        <Footer />
      </div>
    </div>
  );
} 