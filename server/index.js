import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import mongoose from "mongoose";
import Upload from "./models/Upload.js";
import { products, cities } from "./data.js";
const __dirname = "D:\\etc\\p2p commerce";

//Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

//Database connection
// const url =
//     "mongodb+srv://nsa:nsa%402021@cluster0.dbkqe.mongodb.net/p2p_ecommerce?retryWrites=true&w=majority";
// await mongoose.connect(url, (err, res) => {
//     if (err) return console.log(err);
//     else return console.log("DB Connected");
// });

// const db = mongoose.connection;
app.get("/api/products/:id", (req, res) => {
    const product = products.find((x) => x._id == req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: `Product Not Found-${req.params.id}` });
    }
});

app.get("/api/products", (req, res) => {
    res.send({ products: products, cities: cities });
});
// app.post("/", async(request, response) => {
//     const upload = new Upload(request.body);
//     try {
//         await upload.save();
//         response.send(upload);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

// const db = mysql2.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "hadroncollider",
//     database: "p2pCommerce",
// });

// db.connect((err) => {
//     if (err) console.log(err);
//     else console.log("DB connected!");
// });

//Image upload
// app.post("/upload", (req, res) => {
//     if (req.files === null) {
//         return res.status(400).json({ msg: "No file uploaded" });
//     }
//     const file = req.files.file;
//     const ext = file.mimetype.split("/")[1];
//     const name = req.body.name;
//     const price = req.body.price;
//     const path = "/uploadedImages/" + Date.now() + "." + ext;
//     file.mv(`${__dirname}/client/public/${path}`, (err) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send(err);
//         }
//         return res.json({
//             name: name,
//             price: price,
//             filePath: `${path}`,
//         });
//     });
//     const sqlInsert =
//         "INSERT INTO uploads (name, price, imagePath) VALUES (?, ?, ?)";
//     db.query(sqlInsert, [name, price, path], (error, result) => {
//         if (error) {
//             console.log(error);
//             return res.send({
//                 msg: error,
//             });
//         }
//         if (result) {
//             return res.send({
//                 data: result,
//                 msg: "Your image has been inserted!",
//             });
//         }
//     });
// });

// app.get("/", (req, res) => {});

// app.listen(4000, () => console.log("Server Started..."));