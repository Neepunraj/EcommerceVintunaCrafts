import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://neepushre97:6baLvKRnrONh9Jcf@cluster0.mdinjjm.mongodb.net/";
  await mongoose
    .connect(connectionUrl as string)
    .then(() => console.log(" Ecommerce database connected Successfully"))
    .catch((error) =>
      console.log("Error Occured while connecting to database ", error.message)
    );
};
export default connectToDB;
/* NaVNrXeCYw5iNPyH */
