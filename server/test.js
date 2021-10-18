import env from "dotenv";
import mongoose from "mongoose";
import express from "express";

//environment vairabl
env.config();
const app = express();
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.dbkqe.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));
// mongoose.on("error", console.error.bind(console, "connection error: "));
// mongoose.once("open", function () {
//   console.log("Connected successfully");
// });
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
