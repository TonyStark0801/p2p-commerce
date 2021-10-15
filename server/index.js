import express from "express";
import cors from "cors";
import mysql2 from "mysql2";
import fileUpload from "express-fileupload";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    fileUpload({
        createParentPath: true,
    })
);

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "hadroncollider",
    database: "p2pCommerce",
});

app.post("/upload", (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;

    const sqlInsert = "INSERT INTO upload (name, price, image) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, price, image], (err, result) => {
        res.send(result);
        console.log(err);
    });
});

db.connect((err) => {
    if (err) console.log(err);
    else console.log("DB connected!");
});

app.listen(5000);