import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
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
      default: "admin",
    },
    contactNumber: { type: String },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(() => {
  this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.method = {
  authenticate: () => {
    return bcrypt.compare(password, this.hash_password);
  },
};

export default mongoose.model("user", userSchema);
