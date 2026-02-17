import mongoose from 'mongoose';

let cached = globalThis as typeof globalThis & {
  mongooseConn?: typeof mongoose;
};

export async function connectDB() {
  if (cached.mongooseConn) return cached.mongooseConn;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');

  cached.mongooseConn = await mongoose.connect(uri, {
    dbName: 'youtube_automation'
  });
  return cached.mongooseConn;
}
