"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarNavItems } from "@/components/admin/nav-items";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Flatten nav items for finding current page title
  const allNavItems = [
    ...sidebarNavItems.overview,
    ...sidebarNavItems.content,
    ...sidebarNavItems.system,
  ];

  return (
    <div className="flex h-16 items-center border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <div className="px-7 py-4 border-b">
            <SheetTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <ChevronRight className="h-4 w-4 text-primary" />
              </div>
              <Link href="/admin" className="font-semibold hover:text-primary transition-colors">
                Admin Panel
              </Link>
            </SheetTitle>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            {/* Overview Section */}
            <div className="px-4 mb-4">
              <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-muted-foreground">
                Overview
              </h2>
              <div className="space-y-1">
                {sidebarNavItems.overview.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Content Section */}
            <div className="px-4 mb-4">
              <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-muted-foreground">
                Content
              </h2>
              <div className="space-y-1">
                {sidebarNavItems.content.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* System Section */}
            <div className="px-4">
              <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-muted-foreground">
                System
              </h2>
              <div className="space-y-1">
                {sidebarNavItems.system.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex-1 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <ChevronRight className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium">
            {allNavItems.find((item) => item.href === pathname)?.title || "Dashboard"}
          </span>
        </div>
        {pathname !== "/admin" && (
          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <Link href="/admin">
              Back to Dashboard
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
} 