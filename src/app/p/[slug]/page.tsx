import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: [post.category],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        <article className="container max-w-3xl px-4 py-12 mx-auto">
          <header className="space-y-8 text-center">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
              >
                {post.category}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                {post.title}
              </h1>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          <div className="mt-12 prose prose-invert prose-zinc max-w-none">
            <MarkdownPreview source={post.content} />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
} 