import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import mysql2 from "mysql2";

const __dirname = "D:\\etc\\p2p commerce";

//Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

//Database connection
const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "hadroncollider",
    database: "p2pCommerce",
});

db.connect((err) => {
    if (err) console.log(err);
    else console.log("DB connected!");
});

//Image upload
app.post("/upload", (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
    }
    const file = req.files.file;
    const ext = file.mimetype.split("/")[1];
    const name = req.body.name;
    const price = req.body.price;
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
    const sqlInsert =
        "INSERT INTO uploads (name, price, imagePath) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, price, path], (error, result) => {
        if (error) {
            console.log(error);
            return res.send({
                msg: error,
            });
        }
        if (result) {
            return res.send({
                data: result,
                msg: "Your image has been inserted!",
            });
        }
    });
});

app.listen(5000, () => console.log("Server Started..."));