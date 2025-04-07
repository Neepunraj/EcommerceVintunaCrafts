import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl = process.env.MONGO_URL;

  await mongoose
    .connect(connectionUrl as string)
    .then(() => console.log(" Ecommerce database connected Successfully"))
    .catch((error) =>
      console.log("Error Occured while connecting to database ", error.message)
    );
};
export default connectToDB;
