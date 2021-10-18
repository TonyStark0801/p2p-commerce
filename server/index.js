import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import env from "dotenv";
import mongoose from "mongoose";

//environment vairabl
env.config();

//MongoDB Connection
//mongodb+srv://tony:<password>@cluster0.55el4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
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

//Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// db.connect((err) => {
//   if (err) console.log(err);
//   else console.log("DB connected!");
// });

// //Image upload
// app.post("/upload", (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: "No file uploaded" });
//   }
//   const file = req.files.file;
//   const ext = file.mimetype.split("/")[1];
//   const name = req.body.name;
//   const price = req.body.price;
//   const path = "/uploadedImages/" + Date.now() + "." + ext;
//   file.mv(`${process.env.PORT}/client/public/${path}`, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }
//     return res.json({
//       name: name,
//       price: price,
//       filePath: `${path}`,
//     });
//   });
//   const sqlInsert =
//     "INSERT INTO uploads (name, price, imagePath) VALUES (?, ?, ?)";
//   db.query(sqlInsert, [name, price, path], (error, result) => {
//     if (error) {
//       console.log(error);
//       return res.send({
//         msg: error,
//       });
//     }
//     if (result) {
//       return res.send({
//         data: result,
//         msg: "Your image has been inserted!",
//       });
//     }
//   });
// });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
