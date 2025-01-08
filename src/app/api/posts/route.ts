import { NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/posts';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return new NextResponse('Slug is required', { status: 400 });
  }

  try {
    const post = getPostBySlug(slug);
    
    if (!post) {
      return new NextResponse('Post not found', { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { slug, ...post } = await request.json();

    if (!slug) {
      return new NextResponse('Slug is required', { status: 400 });
    }

    const filePath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return new NextResponse('Post not found', { status: 404 });
    }

    const { data: existingFrontmatter } = matter(fs.readFileSync(filePath, 'utf8'));
    
    const frontmatter = {
      ...existingFrontmatter,
      title: post.title,
      category: post.category,
      tags: post.tags,
    };

    const fileContent = matter.stringify(post.content, frontmatter);
    fs.writeFileSync(filePath, fileContent);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating post:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 