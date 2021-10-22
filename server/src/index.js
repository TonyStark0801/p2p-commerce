import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import router from "./routes/auth.js";
const url = `mongodb+srv://nsa:nsa%402021@cluster0.dbkqe.mongodb.net/p2p_ecommerce?retryWrites=true&w=majority`;
//const url = "mongodb://localhost/p2p_ecommerce";
env.config();

//Routes
import authRoutes from './routes/auth.js';

//Database connection
mongoose
  .connect(url)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));

//Middlewares
const app = express();
app.use(express.json());
app.use("/api", authRoutes);

//Listen
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
