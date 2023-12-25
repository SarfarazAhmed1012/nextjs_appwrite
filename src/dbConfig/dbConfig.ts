import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    console.log("Mongo URI:", process.env.MONGO_URI);

    connection.on("connected", () => {
      console.log("Mongo DB connection established!");
    });

    connection.on("error", (err) => {
      console.log("Mongo DB connection failed!");
      // console.log(err);
      process.exit;
    });
  } catch (err) {
    console.log("error inside catch", err);
  }
}
