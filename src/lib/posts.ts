import { connectDB } from './db';
import Post, { IPost } from '@/models/Post';

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  excerpt: string;
}

const WORDS_PER_MINUTE = 200;

function calculateReadingTime(content: string): string {
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`.*?`/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/[#*_~`]/g, '');
  const words = cleanContent.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);
  
  return `${minutes} min`;
}

export async function getAllPosts(): Promise<Post[]> {
  await connectDB();
  const posts = await Post.find({}).sort({ createdAt: -1 });
  
  return posts.map(post => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    content: post.content,
    category: post.category,
    author: post.author,
    readTime: calculateReadingTime(post.content),
    excerpt: post.excerpt
  }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  await connectDB();
  const post = await Post.findOne({ slug });

  if (!post) {
    return null;
  }

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    content: post.content,
    category: post.category,
    author: post.author,
    readTime: calculateReadingTime(post.content),
    excerpt: post.excerpt
  };
}

export async function createPost(postData: Omit<Post, 'readTime'>): Promise<Post> {
  await connectDB();
  const post = await Post.create({
    ...postData,
    createdAt: new Date()
  });

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    content: post.content,
    category: post.category,
    author: post.author,
    readTime: calculateReadingTime(post.content),
    excerpt: post.excerpt
  };
}

export async function updatePost(slug: string, postData: Partial<Post>): Promise<Post | null> {
  await connectDB();
  const post = await Post.findOneAndUpdate(
    { slug },
    { $set: postData },
    { new: true, runValidators: true }
  );

  if (!post) {
    return null;
  }

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    content: post.content,
    category: post.category,
    author: post.author,
    readTime: calculateReadingTime(post.content),
    excerpt: post.excerpt
  };
}

export async function deletePost(slug: string): Promise<boolean> {
  await connectDB();
  const result = await Post.findOneAndDelete({ slug });
  return !!result;
}