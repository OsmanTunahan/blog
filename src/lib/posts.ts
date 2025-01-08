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
  const response = await fetch('/api/posts', { next: { revalidate: 3600 } });
  const posts = await response.json();
  
  return posts.map((post: any) => ({
    ...post,
    readTime: calculateReadingTime(post.content)
  }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const response = await fetch(`/api/posts?slug=${slug}`, { next: { revalidate: 3600 } });
  
  if (!response.ok) {
    return null;
  }

  const post = await response.json();
  return {
    ...post,
    readTime: calculateReadingTime(post.content)
  };
}

export async function createPost(postData: Omit<Post, 'readTime'>): Promise<Post> {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  const post = await response.json();
  return {
    ...post,
    readTime: calculateReadingTime(post.content)
  };
}

export async function updatePost(slug: string, postData: Partial<Post>): Promise<Post | null> {
  const response = await fetch(`/api/posts?slug=${slug}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    return null;
  }

  const post = await response.json();
  return {
    ...post,
    readTime: calculateReadingTime(post.content)
  };
}

export async function deletePost(slug: string): Promise<boolean> {
  const response = await fetch(`/api/posts?slug=${slug}`, {
    method: 'DELETE'
  });

  return response.ok;
}