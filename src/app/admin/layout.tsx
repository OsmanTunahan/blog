import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "@/components/admin/Sidebar";
import { MobileNav } from "@/components/admin/MobileNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Mobile Navigation */}
      <div className="sticky top-0 z-50 md:hidden">
        <MobileNav />
      </div>

      <div className="flex h-screen">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden md:flex">
          <div className="w-80 fixed inset-y-0 z-50 border-r border-zinc-800 bg-zinc-950">
            <Sidebar />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 h-full md:pl-80">
          <div className="h-full overflow-y-auto bg-gradient-to-b from-zinc-900 to-black">
            <div className="container max-w-7xl mx-auto p-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 