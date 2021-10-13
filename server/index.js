import express from "express";
import cors from "cors";
import mysql2 from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "hadroncollider",
  database: "p2p_commerce",
});

connection.connect((err) => {
  if (err) console.log(err);
  else console.log("DB connected!");
});

app.listen(5000);
