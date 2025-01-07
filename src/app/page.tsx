import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import Header from "@/components/Header";

export default async function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <Header />

      {/* Compact Hero Section */}
      <section className="pt-24 pb-8 px-4 bg-gradient-to-b from-zinc-900/50">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Cyber Security Expert & Full Stack Developer
          </h1>
          <p className="text-zinc-400">
            Hello, I'm a cyber security expert based in the Turkey. I am also a full stack developer.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {posts.map((post) => (
              <article 
                key={post.slug} 
                className="bg-zinc-900/50 rounded-xl p-6 hover:bg-zinc-800/50 transition group"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <span className="text-sm px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 inline-flex items-center">
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
                <h2 className="text-xl font-semibold mb-3 group-hover:text-white transition">
                  {post.title}
                </h2>
                <p className="text-zinc-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/${post.slug}`} 
                  className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition"
                >
                  Devamını Oku
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-4 mt-12">
        <div className="container mx-auto max-w-4xl text-center text-zinc-400">
          <p>© 2025 Osman Tunahan ARIKAN. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
