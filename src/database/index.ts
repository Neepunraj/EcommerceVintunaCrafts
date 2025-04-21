import mongoose from "mongoose";

const connectToDB = async () => {
  await mongoose
    .connect(connectionUrl as string)
    .then(() => console.log(" Ecommerce database connected Successfully"))
    .catch((error) =>
      console.log("Error Occured while connecting to database ", error.message)
    );
};
export default connectToDB;
/* NaVNrXeCYw5iNPyH */
