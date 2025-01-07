"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Post } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title: string = row.getValue("title");
      return <div className="font-medium">{title}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date: string = row.getValue("date");
      const formattedDate = new Date(date).toISOString().split('T')[0];
      return <div>{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const post = row.original;

      const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
          // TODO: I'll do it here later.
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/edit/${post.slug}`} className="flex items-center">
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={handleDelete}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 