import { LayoutDashboard, FileText, PlusCircle, Settings, FolderOpen } from "lucide-react";

export const sidebarNavItems = {
  overview: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
  ],
  content: [
    {
      title: "All Posts",
      href: "/admin/posts",
      icon: FileText,
    },
    {
      title: "New Post",
      href: "/admin/posts/new",
      icon: PlusCircle,
    },
  ],
  system: [
    {
      title: "Settings",
      href: "/admin/",
      icon: Settings,
    },
  ],
} as const; 