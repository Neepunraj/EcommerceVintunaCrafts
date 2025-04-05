import mongoose from "mongoose";

/* mongodb+srv://neepushre97:<db_password>@cluster0.8qzxx.mongodb.net/ */
const connectToDB = async () => {
  const connectionUrl = process.env.MONGOURL;
  await mongoose
    .connect(connectionUrl as string)
    .then(() => console.log(" Ecommorce database connected Successfully"))
    .catch((error) => console.log("error Occured ", error.message));
};
export default connectToDB;
