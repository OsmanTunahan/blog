import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/posts');

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
  
  return `${minutes} dk`;
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        readTime: calculateReadingTime(content),
        ...data,
      } as Post;
    });

  return allPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      readTime: calculateReadingTime(content),
      ...data,
    } as Post;
  } catch (error) {
    return null;
  }
} 