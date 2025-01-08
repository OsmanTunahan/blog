import Link from "next/link";
import { ArrowRight, Calendar, Clock, Github, Linkedin, Twitter } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section with gradient and pattern */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-background to-background/20" />
          <div className="container relative px-4 py-32 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                Cyber Security Expert & Full Stack Developer
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Hello, I'm a cyber security expert based in Turkey. I am also a full stack developer passionate about building secure and scalable applications.
              </p>
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button variant="outline" size="lg" className="gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-background to-background/50">
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                Latest Posts
              </h2>
              <p className="mt-4 text-muted-foreground">
                Discover my thoughts and insights on cyber security, development, and technology.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {posts.map((post) => (
                <Link 
                  href={`/p/${post.slug}`}
                  key={post.slug} 
                  className="group relative overflow-hidden"
                >
                  <Card className="h-full bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-800/50 transition-all duration-300">
                    <CardHeader className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
                          {post.category}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <div className="w-full pt-4 border-t border-zinc-800">
                        <div className="flex items-center justify-between text-xs text-zinc-400">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.date).toLocaleDateString('tr-TR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}