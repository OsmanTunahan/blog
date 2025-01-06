import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Modern Web Development with Next.js",
    excerpt: "Next.js ile modern web uygulamaları geliştirme sürecinde öğrendiğim en iyi pratikler ve ipuçları...",
    date: "6 Ocak 2024",
    readTime: "5 dk",
    category: "Web Development"
  },
  {
    id: 2,
    title: "TypeScript Best Practices",
    excerpt: "TypeScript ile kod yazarken dikkat edilmesi gereken noktalar ve clean code prensipleri...",
    date: "5 Ocak 2024",
    readTime: "4 dk",
    category: "TypeScript"
  },
  {
    id: 3,
    title: "React Performance Optimization",
    excerpt: "React uygulamalarında performans optimizasyonu için kullanabileceğiniz teknikler...",
    date: "4 Ocak 2024",
    readTime: "6 dk",
    category: "React"
  },
  {
    id: 4,
    title: "Backend Development with Node.js",
    excerpt: "Node.js ile backend geliştirme sürecinde karşılaştığım zorluklar ve çözüm yöntemleri...",
    date: "3 Ocak 2024",
    readTime: "7 dk",
    category: "Backend"
  },
  {
    id: 5,
    title: "Docker ve Containerization",
    excerpt: "Docker kullanarak uygulamalarınızı nasıl container'lara dönüştürebilirsiniz...",
    date: "2 Ocak 2024",
    readTime: "8 dk",
    category: "DevOps"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full border-b border-zinc-800 bg-black/50 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">Osman Tunahan</Link>
          <nav className="space-x-6">
            <Link href="https://osmantunahan.com.tr" className="hover:text-zinc-400 transition">Hakkımda</Link>
          </nav>
        </div>
      </header>

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
                key={post.id} 
                className="bg-zinc-900/50 rounded-xl p-6 hover:bg-zinc-800/50 transition group"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <span className="text-sm px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 inline-flex items-center">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4 text-sm text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
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
                  href={`/${post.id}`} 
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
