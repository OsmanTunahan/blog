import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

if (!(global as any).mongoose) {
  (global as any).mongoose = { conn: null, promise: null } as GlobalMongoose;
}

export async function connectDB() {
  const cached = (global as any).mongoose as GlobalMongoose;

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: "blog",
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then(() => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
