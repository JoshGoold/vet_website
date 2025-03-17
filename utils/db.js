import mongoose from 'mongoose';

let isConnected = false;

export default async function connectToDB() {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return mongoose.connection;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;
        console.log('MongoDB connected');
        return mongoose.connection; // ✅ Return the connection
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Database connection failed');
    }
}