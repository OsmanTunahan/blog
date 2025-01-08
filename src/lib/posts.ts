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

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';

export async function getAllPosts(): Promise<Post[]> {
  try {
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SITE_URL) {
      console.warn('NEXT_PUBLIC_SITE_URL is not set in production. Returning empty posts array.');
      return [];
    }

    const response = await fetch(`${BASE_URL}/api/posts`, {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch posts:', response.status, response.statusText);
      return [];
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid content type received:', contentType);
      return [];
    }

    const posts = await response.json();
    
    return posts.map((post: any) => ({
      ...post,
      readTime: calculateReadingTime(post.content)
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SITE_URL) {
      console.warn('NEXT_PUBLIC_SITE_URL is not set in production. Returning null for post.');
      return null;
    }

    const response = await fetch(`${BASE_URL}/api/posts?slug=${slug}`, {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('Failed to fetch post:', response.status, response.statusText);
      return null;
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid content type received:', contentType);
      return null;
    }

    const post = await response.json();
    return {
      ...post,
      readTime: calculateReadingTime(post.content)
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function createPost(postData: Omit<Post, 'readTime'>): Promise<Post> {
  const response = await fetch(`${BASE_URL}/api/posts`, {
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
  const response = await fetch(`${BASE_URL}/api/posts?slug=${slug}`, {
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
  const response = await fetch(`${BASE_URL}/api/posts?slug=${slug}`, {
    method: 'DELETE'
  });

  return response.ok;
}