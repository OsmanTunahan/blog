"use client";

import { Post } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import { Calendar, MoreVertical, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostCardProps {
  post: Post;
}

function formatDate(date: string) {
  return new Date(date).toISOString().split('T')[0];
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/admin/edit/${post.slug}`} className="block cursor-pointer">
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                {formatDate(post.date)}
              </div>
            </div>
            <div onClick={(e) => e.preventDefault()} className="relative z-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/edit/${post.slug}`} className="flex w-full cursor-pointer items-center">
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit post
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={async (e) => {
                      e.preventDefault();
                      if (window.confirm("Are you sure you want to delete this post?")) {
                        // TODO: I'll do it here later.
                      }
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2">
            {post.excerpt || "No description available"}
          </CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
} 