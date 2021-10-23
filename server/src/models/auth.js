import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
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
    },
    role: {
        type: String,
        enum: ["user"],
        default: "user",
    },
    contactNumber: { type: String },
    pofilePicture: { type: String },
}, { timestamps: true });

userSchema.virtual("password").set(function(password) {
    this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
    authenticate: function(password) {
        return bcrypt.compareSync(password, this.hash_password);
    },
};

export default mongoose.model("User", userSchema);