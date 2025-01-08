import { Metadata, ResolvingMetadata } from "next";
import { getPostBySlug } from "@/lib/posts";

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
      description: 'The requested blog post could not be found.',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    keywords: [post.category],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: [post.category],
      images: [...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@' + post.author.replace(/\s+/g, '').toLowerCase(),
    },
    alternates: {
      canonical: `/p/${post.slug}`,
    },
    other: {
      'article:published_time': post.date,
      'article:author': post.author,
      'article:section': post.category,
    },
  };
}