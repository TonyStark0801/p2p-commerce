import express from "express";
import Upload from "./models/Upload.js";

const app = express();

// app.get("/users", async(request, response) => {
//     const users = await userModel.find({});

//     try {
//         response.send(users);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

module.exports = app;