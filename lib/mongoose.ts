import mongoose from "mongoose";

const mongodburl = process.env.MONGODB_URL?.trim();
if (!mongodburl) {
    throw new Error("MONGODB_URL is not defined");
}
const mongoUrl = mongodburl;

mongoose.set("strictQuery", false);

type MongooseCache = {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
};

const cached = ((global as any).mongoose ?? ((global as any).mongoose = { conn: null, promise: null })) as MongooseCache;

export async function connectToDatabase() {
    try{
        if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(mongoUrl, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
    }
    catch(err){
        console.log("MongoDB connection error:");
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
}