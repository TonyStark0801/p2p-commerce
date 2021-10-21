import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 30,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    hash_password: {
        type: String,
        required: true,
        min: 5,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    contactNumber: { type: String },
    profilePicture: { type: String },
}, { timestamps: true });

userSchema.virtual("password").set(function(password) {
    this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
    authenticate: (password) => {
        return bcrypt.compareSync(password, this.hash_password);
    },
};

export default mongoose.model("User", userSchema);