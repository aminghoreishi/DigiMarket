import "@/models/category";
import "@/models/subCategory";
import "@/models/subSubCategory";

import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/digimarket";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const db = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    });
  }

  cached.conn = await cached.promise;
  console.log("Connected to MongoDB");
  return cached.conn;
};

export default db;
