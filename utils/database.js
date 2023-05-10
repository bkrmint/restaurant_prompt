import mongoose from 'mongoose';

let isConnected = false; // track connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'restaurant-prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('=> using new database connection');
  } catch (error) {
    console.log('=> error while connecting with database', error);
    throw error;
  }
};
