import { getAllPosts, Post } from '@/lib/posts';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    let posts: Post[] = [];
    try {
      posts = await getAllPosts();
    } catch (error) {
      console.error('Error fetching posts for sitemap:', error);
    }

    // Blog post URLs
    const postUrls = posts.map((post: Post) => ({
      url: `${BASE_URL}/p/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Static URLs
    const staticUrls = [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${BASE_URL}/auth/signin`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.3,
      },
    ];

    return [...staticUrls, ...postUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    return [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
    ];
  }
} 