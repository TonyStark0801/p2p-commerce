import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cors from "cors";
const __dirname = "D:\\p2p-commerce";
const url = `mongodb+srv://nsa:nsa%402021@cluster0.dbkqe.mongodb.net/p2p_ecommerce?retryWrites=true&w=majority`;
//const url = "mongodb://localhost/p2p_ecommerce";
env.config();

//Routes
import authRoutes from "./routes/auth.js";
import productRouter from "./routes/ProductRouter.js";
import Product from "./models/ProductModel.js";

//Database connection
mongoose
    .connect(url)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => console.log(err));

//Middlewares
const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", authRoutes);
app.use("/api/products", productRouter);

//Image upload
app.post("/upload", (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
    }
    const file = req.files.file;
    const ext = file.mimetype.split("/")[1];
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const path = "/uploadedImages/" + Date.now() + "." + ext;
    file.mv(`${__dirname}/client/public/${path}`, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        return res.json({
            name: name,
            price: price,
            filePath: `${path}`,
        });
    });
    Product.insertMany({
        name: name,
        price: price,
        image: path,
        category: category,
    });
});

//Listen
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});