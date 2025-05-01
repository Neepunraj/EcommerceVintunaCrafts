import mongoose from "mongoose";
const connectionUrl = process.env.MONGO_URI;
if (!connectionUrl) {
  throw new Error("Please define Mongo_uri");
}
let isConnected: mongoose.Connection["readyState"] | null = null;

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    isConnected = connection.connections[0].readyState;
    console.log("connected to database successfully");
  } catch (error) {
    console.error("Error Connectiont to mongoDB", error);
    throw error;
  }
};
export default connectToDB;
/* NaVNrXeCYw5iNPyH */
