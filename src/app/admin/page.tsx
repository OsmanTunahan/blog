import { getAllPosts } from "@/lib/posts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, PlusCircle, Settings, TrendingUp, Calendar, ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
}

export default async function AdminDashboard() {
  const posts = await getAllPosts();
  const totalPosts = posts.length;

  return (
    <div className="space-y-8">
      {/* Header with Gradient */}
      <div className="relative -mx-4 -mt-2 px-4 py-8 bg-gradient-to-b from-background/80 to-background">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px]" />
        <div className="relative">
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to your blog admin panel.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 transition-all hover:shadow-md hover:shadow-blue-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <FileText className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              +0% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 transition-all hover:shadow-md hover:shadow-green-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{posts[0]?.title || "No posts"}</div>
            <p className="text-xs text-muted-foreground">Latest post</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 transition-all hover:shadow-md hover:shadow-orange-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Settings className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Link href="/admin/posts/new" className="flex items-center justify-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Post
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Posts */}
      <Card className="relative overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>Your latest blog posts</CardDescription>
            </div>
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/admin/posts">
                View all
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.slice(0, 5).map((post: Post) => (
              <Link 
                key={post.slug}
                href={`/admin/posts/edit/${post.slug}`}
                className="group block"
              >
                <Card className="bg-muted/50 border-transparent transition-all hover:bg-muted">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                            {post.category}
                          </Badge>
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(post.date).toLocaleDateString('tr-TR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <CardTitle className="text-base font-medium group-hover:text-primary transition-colors">
                            {post.title}
                          </CardTitle>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}

            {posts.length === 0 && (
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle className="text-center text-muted-foreground">No posts yet</CardTitle>
                  <CardDescription className="text-center">
                    Get started by creating your first blog post
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/admin/posts/new" className="flex items-center gap-2">
                      <PlusCircle className="h-4 w-4" />
                      Create your first post
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 