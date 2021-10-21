import express from "express";
import User from "../models/user.js";

const router = express.Router();
router.post("/signup", (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
        if (user)
            return res.status(400).json({
                message: "User already registered",
            });
        const { name, email, password } = req.body;
        const _user = new User({ name, email, password });
        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: "Something went wrong",
                });
            }
            if (data) {
                return res.status(201).json({
                    user: "User Registered Successfully!",
                });
            }
        });
    });
});
router.post("/signin", (req, res) => {});

export default router;