import { NextRequest, NextResponse } from 'next/server';
import Post from '@/models/Post';
import { connectDB } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const post = await Post.findOne({ slug });
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    const posts = await Post.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();

    const post = await Post.create({
      ...body,
      createdAt: new Date()
    });

    revalidatePath('/');
    revalidatePath('/admin/posts');
    
    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create post' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const body = await request.json();
    await connectDB();

    const post = await Post.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    revalidatePath('/');
    revalidatePath('/admin/posts');
    revalidatePath(`/p/${slug}`);

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    await connectDB();
    const post = await Post.findOneAndDelete({ slug });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    revalidatePath('/');
    revalidatePath('/admin/posts');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
} 