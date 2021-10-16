import express from "express";
import cors from "cors";
import mysql2 from "mysql2";
import multer from "multer";
import path from "path";
const __dirname = path.resolve();
//Middlewares
const app = express();
app.use(cors());
app.use("/", express.static(path.join(__dirname, "/")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//Using multer to save images on the server
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, "./public/images/");
    },
    filename: (req, file, callBack) => {
        const ext = file.mimetype.split("/")[1];
        callBack(null, `${Date.now()}.${ext}`);
    },
});

const upload = multer({
    storage: storage,
});

//Image upload
app.post("/upload", upload.single("image"), (req, res, err) => {
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        res.send({ msg: "Only image files (jpg, jpeg, png) are allowed!" });
    } else {
        const name = req.body.name;
        const price = req.body.price;
        const image = req.file.filename;
        const sqlInsert =
            "INSERT INTO upload (name, price, image) VALUES (?, ?, ?)";
        db.query(sqlInsert, [name, price, image], (error, result) => {
            if (error) {
                console.log(error);
                res.send({
                    msg: error,
                });
            }
            if (result) {
                res.send({
                    data: result,
                    msg: "Your image has been inserted!",
                });
            }
        });
    }
});

app.get("/upload", (req, res) => {
    const id = 7;
    const sqlSelect = "SELECT * FROM upload WHERE id = ?";
    db.query(sqlSelect, [id], (error, result) => {
        if (error) {
            console.log(error);
            res.send({
                msg: error,
            });
        }
        if (result) {
            console.log(result);
            res.send({
                image: result[0].image,
            });
        }
    });
});

app.listen(5000);