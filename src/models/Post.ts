import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  slug: string;
  title: string;
  date: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  excerpt: string;
  createdAt: Date;
}

const PostSchema = new Schema<IPost>({
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters'],
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxlength: [500, 'Excerpt cannot be more than 500 characters'],
  },
}, {
  timestamps: true,
  versionKey: false,
});

PostSchema.index({ createdAt: -1 });

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);