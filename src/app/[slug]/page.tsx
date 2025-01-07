import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import type { MDXComponents } from 'mdx/types';
import rehypePrettyCode from 'rehype-pretty-code';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Props {
  params: {
    slug: string;
  };
}

const options = {
  theme: 'one-dark-pro',
  keepBackground: true,
  onVisitLine(node: any) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className.push('highlighted');
  },
  onVisitHighlightedWord(node: any) {
    node.properties.className = ['word'];
  },
};

const components: MDXComponents = {
  pre: ({ children, ...props }) => (
    <pre {...props} className="relative">
      {children}
    </pre>
  ),
  code: ({ children, className }) => {
    const language = className?.replace('language-', '');
    return (
      <div className="relative group">
        {language && (
          <div className="absolute right-0 top-0 px-3 py-2 text-xs text-zinc-400 bg-zinc-800 rounded-bl">
            {language}
          </div>
        )}
        <pre className="overflow-x-auto p-4 bg-zinc-900 rounded-lg text-sm">
          <code className={className}>{children}</code>
        </pre>
      </div>
    );
  },
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold mt-8 mb-4">{children}</h2>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-zinc-300 leading-relaxed">{children}</p>
  )
};

export default async function BlogPost({ params }: Props) {
  const post = getPostBySlug((await params).slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Blog Post Content */}
      <main className="flex-1 pt-24 pb-16 px-4">
        <article className="container mx-auto max-w-3xl">
          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition"
          >
            <ArrowLeft size={16} />
            Geri Dön
          </Link>

          {/* Post Meta */}
          <div className="mb-8 pb-8 border-b border-zinc-800">
            <div className="flex flex-wrap gap-4 items-center mb-4">
              <span className="text-sm px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-zinc-400">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(post.date).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime}
                </span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              {post.title}
            </h1>
            <p className="text-zinc-400">
              Yazar: {post.author}
            </p>
          </div>

          {/* Post Content */}
          <div className="prose prose-invert prose-zinc max-w-none [&_pre]:!bg-zinc-900 [&_pre]:!p-0 [&_code]:!bg-transparent">
            <MDXRemote 
              source={post.content} 
              components={components}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    [rehypePrettyCode, options]
                  ]
                }
              }} 
            />
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
} 